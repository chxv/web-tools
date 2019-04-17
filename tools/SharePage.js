/*jshint esversion: 6 */

import React from "react";
import ReactDOM from 'react-dom';

import { Input, Comment, Tooltip, List, Icon, Row, Col, Button } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { width } from "window-size";
import { ENGINE_METHOD_NONE } from "constants";
import { NONAME } from "dns";
import { sha256 } from 'js-sha256';
import { configs } from '../config';

const sdata = [

  {
    // actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>

      </Tooltip>
    ),
  },
];

export default class SharePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_comment_username: '', //新评论的用户名
      new_comment_content: '',  //新评论的内容
      new_comment_key: '',      //新评论的密钥
      comment_private_key: '',  //查看隐私评论的密钥
      show_more_setting: false,     // 更多选项是否可见
      data: [],  // 过去的评论
    };
  }

  componentWillMount() {
    //生命周期函数，执行于渲染之前
    this.ReadComments();
  }

  // save input
  onChangeUserName = (e) => {
    this.setState({ new_comment_username: e.target.value });
  }
  onChangeContent = (e) => {
    this.setState({ new_comment_content: e.target.value });
  }
  onChangeWriteKey = (e) => {
    this.setState({ new_comment_key: e.target.value });
  }
  onChangeReadkey = (e) => {
    this.setState({ comment_private_key: e.target.value });
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ new_comment_username: '' });
  }
  setDefaultUsername = () => {
    this.setState({ new_comment_username: 'Anonymous' });
  }

  // click
  MoreSetting = (e) => {
    let s = !this.state.show_more_setting;
    this.setState({ show_more_setting: s });
  }
  ShareContent = (e) => {
    // 上传 - 写
    let d = new Date();
    let content = JSON.stringify({
      "author": this.state.new_comment_username,
      "content": this.state.new_comment_content, 
      "avatar":"",
      "datetime": d.getTime(),
    })
    let key = this.state.new_comment_key ? this.state.new_comment_key : ""; // avoid NoneType
    let url = `${configs['api-method']}://${configs['api-host']}/api/paste/write/`;

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ "data": content, "key": this.state.new_comment_key }), // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(res => {
        if(res.common.status){
          // 写入成功
          this.ReadComments();
          this.ClearInput();
        }
      }).catch(error => console.error("Error When Write(post): ", error));
  }
  ReadByKey = (e) => {
    // 下载 - 读
    let private_key = this.state.comment_private_key;  // 获取时的key
    this.ReadComments(private_key);
  }

  // called func
  ReadComments = (private_key = '') => {
    // console.log(configs);
    let get_url = `${configs['api-method']}://${configs['api-host']}/api/paste/read/${private_key}`;
    // console.log('pk:', private_key);
    fetch(get_url).then(response => {
      return response.json();
    }).then(res => {
      if (res.common.status) {
        let ndata = new Array();
        res.result.forEach(element => {
          // 过滤非法值
          if(element.length < 5){
            this.setState({data: []});
            return;
          }
          let t = JSON.parse(element);
          ndata.push(t);
        });
        // 排序
        ndata = ndata.sort(this.SortData);
        // 转化数字为字符串
        ndata.forEach(element =>{
          if(parseInt(element.datetime)){
            let date = new Date(parseInt(element.datetime));
            element.datetime = date.toString();
          }
        });
        //保存
        this.setState({ data: ndata });
      }
      else{
        console.log("can't get data");
      }
    });
  }

  //排序函数
  SortData = (a, b) =>{
    return b.datetime - a.datetime;
  }

  ClearInput = () => {
    this.setState({
      new_comment_username: '',
      new_comment_key: '',
      new_comment_content: '',
    });
  }

  // render
  render() {
    const { new_comment_username,
            new_comment_key, 
            new_comment_content,
            comment_private_key,
            show_more_setting } = this.state;
    const suffix = new_comment_username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    let more_setting = null;  // 声明变量
    if (show_more_setting) {
      more_setting = (
        <div>
          <br />
          <Input
            prefix={<Icon type='lock' />}
            placeholder="private key: 设置对分享内容加密"
            value={new_comment_key}
            onChange={this.onChangeWriteKey}
          />
          <br /><br />
        </div>
      );
    }
    else {
      more_setting = (
        <br />
      );
    }

    return (
      <div>
        <Row>
          <Col span={18}>
            <Input
              // ref='key_post'
              placeholder="Enter your username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={new_comment_username}
              onChange={this.onChangeUserName}
              ref={node => this.userNameInput = node}  // 用于emitEmpty
              addonAfter={<Icon type="bulb" onClick={this.setDefaultUsername} />}
            />
          </Col>

          <Col span={2} offset={1}>
            <Button type="primary" onClick={this.ShareContent}><Icon type="thunderbolt" />发布</Button>
          </Col>

          <Col span={1} offset={1}>
            <Button onClick={this.MoreSetting}> <Icon type="ellipsis" /> </Button>
          </Col>
        </Row>

        {more_setting}
        <TextArea rows={5} value={new_comment_content} onChange={this.onChangeContent} />

        {/* 输入key，读取 */}
        <br /> <br />
        <Row>
          <Col span={18}>
            <Input
              value={comment_private_key}
              onChange={this.onChangeReadkey}
              prefix={<Icon type='lock' />}
              placeholder="private key: 提取加密分享"
            />
          </Col>
          <Col span={1}>
            <div></div>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.ReadByKey}><Icon type="thunderbolt" />查看</Button>
          </Col>
        </Row>

        {/* 显示公共区域内容 */}
        <List
          className="comment-list"
          header={`${this.state.data.length} Comments`}
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={item => (
            <Comment
              // actions={item.actions}
              author={item.author}
              // avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          )}
        />
      </div>
    );
  }
}