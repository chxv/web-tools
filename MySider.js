/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

{/* 全局变量 */}
const initial_item = "show";
const initial_dir = "ctf";


class MySider extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        selected_item: initial_item,
        selected_dir: initial_dir,
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
  
      this.setState({
        selected_item: e.key,
        selected_dir: e.keyPath[1]
      });
      // console.log('click ', e);
  
      (() => { this.props.handleChoose(e); })();  // 调用父函数，用来传参
    }
    render(){
      return (
        <Sider width={200} breakpoint="lg" collapsedWidth="0"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type) }}
        >
          <Menu
            mode="inline" /*defaultSelectedKeys={[initial_item]}*/ defaultOpenKeys={[initial_dir, "funny"]}
            style={{ height: '100%', borderRight: 0 }}
             onClick={this.handleClick}
          >
            <SubMenu key="ctf" title={<span><Icon type="tool" />ctf</span>}>
              <Menu.Item key="1">移位变换</Menu.Item>
            </SubMenu>
            <SubMenu key="funny" title={<span><Icon type="bulb" />funny</span>}>
              <Menu.Item key="5">粘贴板</Menu.Item>
            </SubMenu>
            <SubMenu key="others" title={<span><Icon type="rocket" />others</span>}>
              <Menu.Item key="9">option1</Menu.Item>
              <Menu.Item key="10">option2</Menu.Item>
              <Menu.Item key="11">option3</Menu.Item>
              <Menu.Item key="12">option4</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      );
    }
  }

export default MySider