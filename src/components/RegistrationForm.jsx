import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import http from '../common/http-common';
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState();

  const verifyCode = (verifyData) => {
    setCode();
    setVerify(true);
    console.log(verifyData.code);
    http.get(`/code/${verifyData.code}`)
    .then((response)=>{
      console.log(response.data._id);
      console.log(response.data.location);
      const code = response.data._id
      const location = response.data.location
      setCode({code, location});
      console.log('Verified');
      message.success(`Succefully Verified! You will be register as admin from ${location} Centre`);
      })
    .catch((err)=>{
      console.log(err);
      setCode();
      setVerify(false);
      message.error('Invalid Code. Please check again or register as normal user.');
    })
  }

  
  const onFinish = (values) => {
    setLoading(true);
    const {confirm, ...data} = values;

    if (!code) {
      var userRole = "user";
      var userLocation = null;
    } else {
      var userRole = "admin";
      var userLocation = code.location;
    }
    
    http.post('/user/reg', {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      email: data.email,
      role: userRole,
      location: userLocation
    })
    .then((response)=>{
      console.log(response.data)
      setLoading(false);
      console.log('Registration Completed')
      message.success(`Registration Successful. Welcome ${data.username}.`)
      setTimeout(()=>
      navigate('/login'), 3000);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
  const tailFormItemLayout = {
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

  return (
    <>
      <Form {...formItemLayout} name="verify" onFinish={verifyCode}>
        <Form.Item name="code" label="Code">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name="code" label="Code" noStyle>
              <Input placeholder="Reference Code for Registration" disabled={verify} allowClear="true"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button htmlType="submit" disabled={verify}>Verify Identity</Button>
          </Col>
        </Row>
        </Form.Item>
      </Form>
      <Form {...formItemLayout} name="register" onFinish={onFinish}>
        <Form.Item name="firstname" label="First Name" initialValue=""><Input /></Form.Item>
        <Form.Item name="lastname" label="Last Name" initialValue=""><Input /></Form.Item>
        <Form.Item name="username" label="Username" rules={usernameRules}><Input /></Form.Item>
        <Form.Item name="email" label="E-mail" rules={emailRules}><Input /></Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}><Input.Password /></Form.Item>
        <Form.Item name="confirm" label="Confirm Password" rules={confirmPwdRules}><Input.Password /></Form.Item>

        <Form.Item {...tailFormItemLayout}>
          { loading ? (
                <LoadingOutlined spin />
              ):(
          <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">Register</Button>)}
          </Form.Item>
        </Form>
    </>
    
  );
}

export default RegistrationForm;