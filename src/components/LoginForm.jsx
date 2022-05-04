import React from 'react';
import { Form, Input, Button, message } from 'antd';
import http from '../common/http-common';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function LoginForm() {
  
function onFinish(values) {
  const {confirm, ...data} = values;
  let encoded = `${data.username}:${data.password}`;
  let accessToken = base64_encode(encoded);

      http.get(`/user/${data.username}`, {
        headers: {
          'Authorization': `Basic ${accessToken}`
        }})
        .then((response)=>{
          console.log(response.status)
          if(response.data){
            localStorage.setItem("auth", accessToken);
            localStorage.setItem("user", JSON.stringify(response.data[0]));
            message.success(`Login Successful. Welcome ${data.username}.`);
          } else {
            message.success('Fail to Login');
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
  const DetailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
  };

  const usernameRules = [
    {required: true, message: 'Please input a username.'}
  ]
    
  const passwordRules = [
    {required: true, message: 'Please input a password.'}
  ]

  return (
    <Form {...formItemLayout} name="register" onFinish={onFinish}>
      <Form.Item name="username" label="Username" rules={usernameRules}><Input /></Form.Item>
      <Form.Item name="password" label="Password" rules={passwordRules}><Input.Password /></Form.Item>
      <Form.Item {...DetailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;