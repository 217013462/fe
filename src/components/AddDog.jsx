import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import http from '../common/http-common';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
import dogbreeds from '../public/data/dogbreeds.json'
import { LoadingOutlined, PlusCircleOutlined, RollbackOutlined } from '@ant-design/icons';

const AddDogForm = () => {
  
  function disabledDate(current) {
    // Can not select days in the future
    return current > moment().endOf('day');
  }
  
  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { Option } = Select;
  
  const onFinish = (values) => {
    setLoading(true);
    const accessToken = auth.accessToken;
    const {confirm, ...data} = values;
    console.log(values);
    
    if(!data.birthdate){
      console.log('No Birth date were selected.');
      var bdate = ("");
    } else {
      console.log(moment(data.birthdate).format("YYYY-MM-DD"));
      var bdate = moment(data.birthdate).format("YYYY-MM-DD");
    }
    
    http.post('/dog/add', {
      breed: data.breed,
      name: data.name,
      gender: data.gender,
      birthdate: bdate,
      location: data.location      
    } , {
      headers: {
        'Authorization': `Basic ${accessToken}`
      }})
    .then((response)=>{
      console.log(response.data);
      setLoading(false);
      message.success(`Added to the list.`);
      navigate('/dog'), 3000
    })
    .catch((err)=>{
      setLoading(false);
      message.error('Unable to add.');
      console.log(err)
    })
}
  
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 8 } }
  };
  const tailFormItemLayout = {
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
    

  return ( <>
      {auth.role == "admin" ? ( <>
      <br></br>
      <br></br>
      <h1 align="center">Add Dog to Database</h1>
      <br></br>
      <br></br>
      <Form {...formItemLayout} name="addDog" onFinish={onFinish}>
        <Form.Item name="breed" label="Breed" rules={breedRules}>
          <Select placeholder="Please select a breed" rules={breedRules}>
            { dogbreeds && dogbreeds.map ((breed, key)=>{
              return <Option key={key} value={breed} >{breed}</Option>
            })}    
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Name" initialValue=""><Input /></Form.Item>
        <Form.Item name="gender" label="Gender" rules={genderRules}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>  
        </Form.Item>
        <Form.Item name="birthdate" label="Birth Date">
          <DatePicker disabledDate={disabledDate} onChange={onChange}/>
        </Form.Item>
        <Form.Item name="location" label="Location" rules={locationRules}>
          <Select>
            <Option value="Mong Kok">Mong Kok</Option>
            <Option value="Causeway Bay">Causeway Bay</Option>
            <Option value="Sha Tin">Sha Tin</Option>
            <Option value="Yuen Long">Yuen Long</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          { loading ? ( <LoadingOutlined spin /> ):( <>
          <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">
            Add
          </Button>
          <Button icon={<RollbackOutlined />} onClick={()=>navigate(-1)}>Back</Button> </> )}
        </Form.Item>
      </Form>
      </> ):( <>
        <div align="center">
          <br></br>
          <br></br>
          <br></br>
          <h1>Unauthorized Access!</h1>
          <h2>Please login as Admin for access.</h2>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </> )
      }
  </> );

}

export default AddDogForm;