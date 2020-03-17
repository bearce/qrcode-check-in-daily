import React from 'react';
import QRCode from 'qrcode'
import { Modal } from 'antd';

class CreateQrCode extends React.Component {
    
    state = {
        id: "",
        image: ""
    }

    handleNewQRCode = () => {
        QRCode.toDataURL(this.props.id, { width: 300 })
        .then(url => {
            this.setState({image: url});
        })
        .catch(err => {
            console.error(err)
        })
    }

    componentDidMount() {
        this.handleNewQRCode()
    }
    
    render() {
        const { image, id } = this.state;
        const { isVisible, onClose } = this.props;
        return (
            <Modal style={{textAlign: "center"}} visible={isVisible} onOk={onClose} onCancel={onClose}>
                <img src={image} />
            </Modal>
        )
    }
}

export default CreateQrCode;