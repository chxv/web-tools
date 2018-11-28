/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
const { SubMenu } = Menu;

{/* 全局变量 */}
const tools_url = "/tools";
const home_url = "/";

class MyHeader extends React.Component{

    constructor(props) {
      super(props);
      this.state = {header_key: tools_url};
  
      // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
  
      this.setState({
        header_key: e.key,
      });
      // console.log('click ', e.key);
      window.location.href=e.key;  // 跳转
    }
  
    render(){
      return (
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark" mode="horizontal" defaultSelectedKeys={[tools_url]} style={{ lineHeight: '64px' }}
            onClick={this.handleClick} selectedKeys={[this.state.header_key]}
          >
            <Menu.Item key={home_url}> xchens </Menu.Item>
            <Menu.Item key={tools_url}> tools </Menu.Item>
          </Menu>
        </Header>
      );
    }
  }

export default MyHeader