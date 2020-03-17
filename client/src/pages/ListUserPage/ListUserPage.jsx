import React from 'react';
import LayoutMedium from '../../components/Layout/LayoutMedium/LayoutMedium';
import { Table, message, Modal } from 'antd';
import { getGuestsAPI } from '../http_request';
import { columns } from './columns';
import CreateQrCode from '../../components/Child/CreateQrCode';

class ListUserPage extends React.Component {

    state = {
        guests: [],
        getQRCode: false,
        idUser: "",
        loading: false
    }

    onClose = () => {
        this.setState({getQRCode: false});
    }

    fetchGuests = () => {
        this.setState({loading: true}, () => {
            getGuestsAPI()
            .then(({data}) => {
                let { guests, message, status, code } = data;

                if(status !== "error" && status === "ok") {
                    guests = guests.map(guest => {
                        return {
                            ...guest,
                            key: guest.id,
                            qrCode: {
                                onFunc: () => this.setState({idUser: guest.id, getQRCode: true})
                            }
                        }
                    })
                    this.setState({
                        loading: false,
                        guests
                    })
                }
                else {
                    
                }
            })
            .catch(err => {
                message.error(JSON.stringify(err));
            })
        })
    }

    componentDidMount() {
        this.fetchGuests()
    }

    render() {
        const { guests, getQRCode, idUser } = this.state;
        console.log(getQRCode, idUser)
        return (
            <div style={{marginTop: "20px"}}>
                {
                    getQRCode && <CreateQrCode onClose={this.onClose} isVisible={getQRCode} id={idUser} />
                }
                <LayoutMedium>
                    <Table
                    columns={columns}
                    dataSource={guests} />
                </LayoutMedium>
            </div>
        )
    }
}

export default ListUserPage;