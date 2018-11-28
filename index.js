/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
const { Header, Footer, Sider, Content} = Layout;
const {SubMenu} = Menu;

import MyHeader from './Myheader';
import MySider from './MySider';
import MyContent from './MyContent';

{/* 初始变量 */}
// const tools_url = "/tools";
// const home_url = "/";
const initial_item = "show";
const initial_dir = "ctf";



class MyBreadcrumb extends React.Component{
  render(){
    return(
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Tools</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.choosing_dir}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.choosing_item}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}



{/* 父组件 */}
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      choosing_item: initial_item,  // 文件下选择的项
      choosing_dir: initial_dir,  // 左侧选择的文件夹
    };

    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(e){
    this.setState({
      choosing_item: e.key,
      choosing_dir: e.keyPath[1]
    });
    // console.log('App:', e);
  }


  render(){
    return (
      <Layout>
      <MyHeader />
      <Layout style={{ padding: '0 50px', marginTop: 64 }}>
        <MySider handleChoose={this.handleChoose.bind(this)}/>
        <Layout style={{ padding: '0 24px 24px' }}>
          <MyBreadcrumb choosing_dir={this.state.choosing_dir} choosing_item={this.state.choosing_item} />
          <MyContent choosing_item={this.state.choosing_item} />
        </Layout>
      </Layout>

      {/* back to top */}
      <div>
        <BackTop />
        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> https://xchens.cn </strong>
      </div>
    </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
