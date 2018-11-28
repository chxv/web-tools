/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
const { Header, Footer, Sider, Content} = Layout;
const {SubMenu} = Menu;

/* 加载所有组件，虽然很不乐意。。 */
import DefaultShow from "./tools/DefaultShow";
import CaesarCipher from "./tools/CaesarCipher";


{/* 全局变量 */}
const kv = {
    'show': (<DefaultShow />),  // 如果什么也不选或者选中了无效的（未完成的）页面
    '1': (<CaesarCipher />),  //key为1则表示选择了Caesar cipher解密工具页面
};

class MyContent extends React.Component{
    render(){
        let item = this.props.choosing_item;
        let page = kv[item];
      return(
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 1600 }}>
            {page}
        </Content>
      );
    }
  }

export default MyContent