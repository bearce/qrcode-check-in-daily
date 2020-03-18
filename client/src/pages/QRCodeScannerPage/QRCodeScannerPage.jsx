import React from 'react';
import QrReader from 'react-qr-reader'
import { message, Spin, Typography  } from 'antd';
import { getGuestAPI, check_IN_OUT_API } from '../http_request';
import LayoutMedium from '../../components/Layout/LayoutMedium/LayoutMedium';
import './qrcode-scanner-page.css';

class QRCodeScannerPage extends React.Component {

    state = {
        result: "",
        delay: 300,
        loading: false
    }

    handleReset = () => {
        setTimeout(() => {
            this.setState({
                delay: 300, 
                result: "", 
                loading: false
            }) //Reset
        }, 3000);
    }

    // 3.2.A.0 Yêu cầu ghi danh với ID trong mã QRCODE
    checkINOUT = (id) => {
        // 3.2.A.1 Bắt đầu gửi yêu cầu
        this.setState({
            loading: true
        }, () => {
            check_IN_OUT_API(id)
            .then(({data}) => {
                const { status, code } = data;

                //3.2.A.2 Ghi danh thành công
                if(status !== "error" && status === "ok") {
                    message.success(`${data.message} : [CHECK${data.history.status}]`);
                    this.handleReset();
                }
                else {
                    message.error(`${data.message}`); // 3.2.A.2 Ghi danh thất bại
                    this.setState({
                        loading: false
                    })
                }
            }) // 3~ Xảy ra lỗi
            .catch(err => {
                const { code, status } = err;
                message.error(`${status} ${code}: ${err.message}`)
            })
        })
    }

    // 3.0 Kiểm tra người dùng QRCODE có tồn tại hay không ?
    checkGuest = () => {
        let { result } = this.state;
        
        result = result.split("/").join(""); //3.1 Nếu QRCODE chứa URL, lọc ký tự /

        getGuestAPI(result) //3.2 Yêu cầu kiểm tra
        .then(({data}) => {
            const { status, code } = data;

            //3.2.A Kiểm tra thành công -> Người dùng tồn tại -> Yêu cầu ghi danh
            if(status !== "error" && status === "ok") {
                message.success("Đang tiến hành CHECK IN/CHECK OUT"); // Thông báo hoàn tiến hành CHECKIN
                this.checkINOUT(result); //Callback

            } //3.2.B Kiểm tra thất bại -> Người dùng không tồn tại.
            else {
                message.error(`${status} ${code}: ${data.message}`) // Thông báo lỗi
                this.handleReset();
            }
        })
        .catch(err => { //3.2~ Yêu cầu gửi lên có lỗi, người dùng không tồn tại
            const { code, status } = err;
            message.error(`${status} ${code}: ${err.message}`)
            this.handleReset();
        })
    }

    handleScan = data => {
        const { result } = this.state;

        /* Lấy được dữ liệu từ QRCODE */
        if(data && result !== data) {
            message.loading("Đã lấy được dữ liệu, chờ phản hồi"); //1. Phản hồi trạng thái "Đang Ghi Danh"
            this.setState({result: data, delay: 5000}, () => {
                this.checkGuest(this.state.result); //2. Gửi Yêu cầu kiểm người dùng QRCODE có tồn tại trong CSDL -> Next ^
            });
        }
    }

    handleError = err => {
        /* ERROR */
        console.error(err);
        message.error("Lỗi không được cấp quyền");
    }

    render() {
        const { result, delay, loading } = this.state;

        return (
            <Spin spinning={loading}>
                <LayoutMedium>
                    <div className="qrcode-scanner-page">
                        <h1 className="qrcode-scanner-page__title">
                            CHECKIN / CHECKOUT HERE
                        </h1>
                        <Typography.Text code> Mô phỏng check in / check out </Typography.Text>
                        <QrReader
                        className="qrcode-scanner-page__scanner"
                        delay={delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        />
                    </div>
                </LayoutMedium>
            </Spin>
        )
    }
}

export default QRCodeScannerPage