/*jshint esversion: 6 */

import React from "react";
import ReactDOM from 'react-dom';

import { Input,Comment, Tooltip, List, Icon,Row, Col, Button } from 'antd';
const {TextArea} = Input;
import moment from 'moment';
import { width } from "window-size";
import { ENGINE_METHOD_NONE } from "constants";
import { NONAME } from "dns";

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

export default class SharePage extends React.Component{
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
    emitEmpty = () => {
      this.userNameInput.focus();
      this.setState({ new_comment_username: '' });
    }
    setDefaultUsername = () => {
      this.setState({ new_comment_username: 'Anonymous'});
    }

    onChangeUserName = (e) => {
      this.setState({ new_comment_username: e.target.value });
    }

    ShareIdea = (e) => {
      alert("上传成功");
    }

    MoreSetting = (e) => {
      let s = ! this.state.show_more_setting;
      this.setState({ show_more_setting: s });
    }
    componentWillMount(){
      //生命周期函数，执行于渲染之前
      this.LoadComment();
    }
    LoadComment = (e) =>{
      fetch('data.json').then(res => {
          return res.json();
        }).then(my_json =>{
          console.log('get data: ', my_json);
          this.setState({data: my_json});
      });
    }

    render(){
      
      const { new_comment_username, show_more_setting } = this.state;
      const suffix = new_comment_username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
      let more_setting = null;  // 声明变量
      if(show_more_setting){
        more_setting = (
          <div>
            <br />
            <Input 
              prefix={<Icon type='lock'/> }
              placeholder="private key: 设置对分享内容加密"
            />
            <br /><br />
          </div>
        );
      }
      else{
        more_setting = (
          <br />
        );
      }

      return (
          <div>
            <Row>
              <Col span={17}>
                <Input
                  placeholder="Enter your username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={suffix}
                  value={new_comment_username}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}  // 用于emitEmpty
                  addonAfter={<Icon type="bulb" onClick={this.setDefaultUsername}/>}
                />
              </Col>

              <Col span={2} offset={1}>
                <Button type="primary" onClick={this.ShareIdea}><Icon type="thunderbolt" />发布</Button>
              </Col>

              <Col span={1} offset={2}>
                <Button onClick={this.MoreSetting}> <Icon type="ellipsis" /> </Button>
              </Col>
            </Row>

            {more_setting}
            <TextArea rows={5} />
            <List
                className="comment-list"
                header={`${this.state.data.length} Comments`}
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <Comment
                    // actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    />
                )}
            />
          </div>
        );
    }
}