import React from 'react';
import LayoutMedium from '../../components/Layout/LayoutMedium/LayoutMedium';
import "./history-checkin.css";
import {utils} from '../../assets/utils/index';
import { Alert, Typography, Tag, Spin, Result, Button, message, Input } from 'antd';
import { getHistorysAPI } from '../http_request';
import Search from 'antd/lib/input/Search';

class HistoryCheckinPage extends React.Component {

    state = {
        historys: [],
        loading: false
    }

    handleFindHistoryOfGuest = (value, e) => {
        this.fetchHistorys(`?userId=${value}`);
        window.history.pushState(`?userId=${value}`,`?userId=${value}`,`?userId=${value}`)
    }

    fetchHistorys = (query = "") => {
        this.setState({loading: true}, () => {
            getHistorysAPI(query)
            .then(({data}) => {
                const { status, code } = data;
                console.log(data);
                if(status !== "error" && status === "ok") {
                    const { historys } = data;
                    this.setState({
                        historys: historys.reverse(),
                        loading: false
                    })
                }
                else {
                    this.setState({
                        loading: false,
                        historys: []
                    })
                }
            })
            .catch(err => {
                message.error(JSON.stringify(err));
            })
        })
    }

    componentDidMount() {
        this.fetchHistorys(window.location.search);
    }

    render() {
        const { loading, historys } = this.state;

        const Status = (text) => <Tag color={"warning"}> {text} </Tag>;
        
        return (
            <Spin spinning={loading}>
                <div className="history-checkin">
                    <LayoutMedium>
                        <Typography.Title className="history-checkin__title">Trạng thái duyệt</Typography.Title>

                        {
                            <Search
                            onSearch={this.handleFindHistoryOfGuest}
                            style={{marginBottom: "15px"}} 
                            placeholder="Tìm kiếm theo User ID" 
                            loading={loading} type="primary" />
                        }

                        {
                            historys.length !== 0 ? historys.map((history, index) => (
                                <Alert key={history.id} 
                                showIcon 
                                type={index % 2 === 0 ? "warning" : "info"} 
                                message={`ID: ${history.guestId} - ${history.fullname}`} 
                                description={Status(`"CHECK ${history.status}" - ${utils.getDMY(history.created)} lúc ${utils.getTime(history.created)} `)} 
                                className="history-checkin__alert" />
                            )) : <Result
                            title="History is empty"
                            extra={
                              <Button type="primary" key="console">
                                  SCAN NOW
                              </Button>
                            }
                          />
                        }
                    </LayoutMedium>
                </div>
            </Spin>
        )
    }
}

export default HistoryCheckinPage