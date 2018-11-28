/*jshint esversion: 6 */

import React from "react";
import ReactDOM from 'react-dom';

import { Input, Icon, Collapse, List } from 'antd';
const {TextArea} = Input;
const Panel = Collapse.Panel;

const lowerChar = "abcdefghijklmnopqrstuvwxyz";
const upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default class CaesarCipher extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            data: []
        };

        // this.handleKeydown = this.handleKeydown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
     }
    // handleKeydown(e){
    //     // handle Enter key
    //     if(e.key === "Enter"){
    //         this.Calculate();
    //     }
    // }

    handleInputChange(e){
        // update inputText and Calculate the result of Caesar cipher

        let new_text = e.target.value;
        let new_data = [];

        if(new_text.length === 0){
            // do nothing but set data to []
        }
        else if (new_text.length < 70){
            for(let i=1; i <26; ++i){
                new_data.push(this.StrOffset(i.toString() + ':  ' + new_text, i));
            }
        }
        else{
            for(let i=1; i <26; ++i){
                let tmp_text = this.StrOffset(i.toString() + ':  ' + new_text, i); // 当前偏移后字符串
                let succinct_text = tmp_text.substring(0,60); //截取前六十个字符
                let item = (
                    <Collapse bordered={false}>
                    <Panel header={succinct_text}>
                      {tmp_text}
                    </Panel>
                  </Collapse>
                );
                new_data.push(item);
            }
            
        }

        this.setState({
            data: new_data,
            inputText: new_text,
        });
    }

    StrOffset(str, off){
        // 计算str的off偏移
        let r = "";
        for(var index in str){
            let ch = str[index];

            if (lowerChar.indexOf(ch) >= 0){
                //小写字母
                let pos = (lowerChar.indexOf(ch) + off)%26;
                r += lowerChar[pos];
            }
            else if (upperChar.indexOf(ch) >= 0){
                //大写字母
                let pos = (upperChar.indexOf(ch) + off)%26;
                r += upperChar[pos];
            }
            else{
                //其他字符
                r += ch;
            }
        }
        return r;
    }

    render(){
        return (
          <div>
            {/* 标题 */}
            <h1>CaesarCipher</h1>
            {/* 输入 */}
            <TextArea placeholder="input pwd and we will show the possible answer for you !" 
                autosize={{ minRows: 1 }} onChange={this.handleInputChange} />
            
            {/* 显示 */}
            <List
              size="small"
              bordered
              dataSource={this.state.data}
              renderItem={item => (<List.Item>{item}</List.Item>)}
              style={{ marginTop: 10 }}
            />
          </div>
        );
    }
}