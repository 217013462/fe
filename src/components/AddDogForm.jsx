import React from 'react';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import http from '../common/http-common';
import moment from 'moment';
import dogbreeds from '../public/data/dogbreeds.json'

  const authLogin = localStorage.getItem("auth");

function AddDogForm() {
  
  const { Option } = Select

  function onChange(date, dateString) {
    console.log(date, dateString)
  }
  
  function onFinish(values) {
    const {confirm, ...data} = values;
    console.log(values)
    
    http.post('/dog/add', {
      breed: data.breed,
      name: data.name,
      gender: data.gender,
      birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
      location: data.location      
    } , {
      headers: {
        'Authorization': `Basic ${authLogin}`
      }})
    .then((response)=>{
      console.log(response.data)
      message.success(`Added to the list.`)  
    })
    .catch((err)=>{
      console.log(err)
    })
}
  
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 8 } }
  };
  const DetailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }
  };

  const breedRules = [
    {required: true, message: 'Please select the breed.'}
  ]
  const genderRules = [
    {required: true, message: 'Please select the gender.'}
  ]
  const locationRules = [
    {required: true, message: 'Please select location.'}
  ]
    

  return (
    <Form {...formItemLayout} name="addDog" onFinish={onFinish}>
      <Form.Item name="breed" label="Breed" rules={breedRules}>
        <Select placeholder="Please select a breed" rules={breedRules}>
          { dogbreeds && dogbreeds.map ((breed, key)=>{
            return <Option key={key} value={breed} >{breed}</Option>
          })}    
        </Select>
      </Form.Item>
      <Form.Item name="name" label="Name"><Input /></Form.Item>
      <Form.Item name="gender" label="Gender" rules={genderRules}>
        <Select>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>  
      </Form.Item>
      <Form.Item name="birthdate" label="Birth Date">
        <DatePicker onChange={onChange}/>
      </Form.Item>
      <Form.Item name="location" label="Location" rules={genderRules}>
        <Select>
          <Option value="Mong Kok">Mong Kok</Option>
          <Option value="Causeway Bay">Causeway Bay</Option>
          <Option value="Sha Tin">Sha Tin</Option>
          <Option value="Yuen Long">Yuen Long</Option>
        </Select>
      </Form.Item>
      <Form.Item {...DetailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <p style={{color:'red'}}>* is a required field</p>
      </Form.Item>
    </Form>
  );

}

export default AddDogForm;