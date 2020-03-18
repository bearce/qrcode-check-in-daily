import React from 'react';
import { Button } from 'antd';

export const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname',
    },
    {
        title: 'Lastname',
        dataIndex: 'lastname',
        key: 'lastname',
    },
    {
        title: 'QRCODE',
        dataIndex: 'qrCode',
        key: 'qrCode',
        render: qrCode => (
            <Button type="primary" onClick={qrCode["onFunc"]}>GET QRCODE</Button>
        )
    }
]