import React from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

class MenuInterface extends React.Component {
  state = {
    current: localStorage.getItem("key") || 'qr-scanner',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    localStorage.setItem("key", e.key);
  };

  render() {
    console.log(this.state.current)
    return (
      <Menu style={{textAlign: "center"}} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="qr-scanner">
          <MailOutlined />
          <NavLink to="/qr-scanner">
            QR SCANNER
          </NavLink>
        </Menu.Item>
        <Menu.Item key="checkin-history">
          <AppstoreOutlined />
          <NavLink to="/history-checkin">
            HISTORY
          </NavLink>
        </Menu.Item>
        <Menu.Item key="list-user">
          <AppstoreOutlined />
          <NavLink to="/list-user">
            GET QRCODE OF USER
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuInterface;