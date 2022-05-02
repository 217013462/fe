import React from 'react';
import { Form, Input, Button, message } from 'antd';
import http from '../common/http-common'

function RegistrationForm() {
  
  function onFinish(values) {
    const {confirm, ...data} = values;
    
    http.post('/user/reg', {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      email: data.email,
      role: "user", //default as normal user
    })
    .then((response)=>{
      console.log(response.data)
      message.success('Registration Completed.')  
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
  
  const emailRules = [
    {type: 'email', message: 'The input is not valid e-mail.'},
    {required: true, message: 'Please input an e-mail address.'}
  ]
  
  const passwordRules = [
    {required: true, message: 'Please input a password.'}
  ]

  const confirmPwdRules = [
    {required: true, message: 'Please confirm password.'},
    ({getFieldValue})=>({
      validator(rule, value){
        if(!value||getFieldValue('password')===value){
          return Promise.resolve();
        }
        return Promise.reject('The two passwords that entered do not match. Please re-enter.')
      }
    })
  ]
  const sendForm = () => {
    const hide = message.loading('Registration in progress...', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  }
  return (
    <Form {...formItemLayout} name="register" onFinish={onFinish}>
      <Form.Item name="firstname" label="First Name"><Input /></Form.Item>
      <Form.Item name="lastname" label="Last Name"><Input /></Form.Item>
      <Form.Item name="username" label="Username" rules={usernameRules}><Input /></Form.Item>
      <Form.Item name="email" label="E-mail" rules={emailRules}><Input /></Form.Item>
      <Form.Item name="password" label="Password" rules={passwordRules}><Input.Password /></Form.Item>
      <Form.Item name="confirm" label="Confirm Password" rules={confirmPwdRules}><Input.Password /></Form.Item>
      <Form.Item {...DetailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={sendForm}>Register</Button>
      <p style={{color:'red'}}>* is a required field</p>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;