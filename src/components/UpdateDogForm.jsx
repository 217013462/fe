import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Select, DatePicker, Spin } from 'antd';
import http from '../common/http-common';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
import dogbreeds from '../public/data/dogbreeds.json'
import { LoadingOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import NotFound from './NotFound';


const onChange = (date, dateString) => {
  console.log(date, dateString)
}

const UpdateDogForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [dog, setDog] = useState(null);
  const { id } = useParams(); 
  const { auth } = useAuth();
  const { Option } = Select;

  useEffect(
    async () => {
      setLoading(true);
      try {
        const response = await http.get(`/dog/${id}`);
        setDog(response.data);
        } catch (err) {
        concole.log(err);
        }
      setLoading(false);
      }, []);
  
  const onFinish = (values) => {
    setLoadingForm(true);
    const accessToken = auth.accessToken;
    const {confirm, ...data} = values;
    console.log(values);
    
    http.put(`/dog/${id}`, {
      breed: data.breed,
      name: data.name,
      gender: data.gender,
      birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
      location: data.location      
    } , {
      headers: {
        'Authorization': `Basic ${accessToken}`
      }})
    .then((response)=>{
      console.log(response.data);
      setLoadingForm(false);
      message.success(`Successfully Updated.`);
      navigate(`/dog/${id}`), 3000
    })
    .catch((err)=>{
      console.log(err);
      setLoadingForm(false);
      message.error('Unable to update.');
      navigate(`/dog/${id}`), 3000
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
    
  if(loading){
    const antIcon = <LoadingOutlined spin />;
    return (<div align="center"><Spin tip="Loading Dog Detail..." indicator = {antIcon}/></div>)
  } else {
  if(!dog){
    return (
      <NotFound />
    )
  } else {
    return ( <>
        {auth.role == "admin" ? ( <>
        <br></br>
        <br></br>
        <h1 align="center">Update Dog Detail</h1>
          <h3 align="center">Dog ID: {id}</h3>
        <br></br>
        <br></br>
        <Form {...formItemLayout} 
          name="updateDog" 
          onFinish={onFinish}
          initialValues={{
						breed: dog?.breed ? `${dog.breed}` : '',
            name: dog?.name ? `${dog.name}` : '',
						gender: dog?.gender ? `${dog.gender}` : '',
						birthdate: dog?.birthdate ? moment(`${dog.birthdate}`) : '',
						location: dog?.location ? `${dog.location}` : ''
						}}
          >
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
          <Form.Item name="location" label="Location" rules={locationRules}>
            <Select>
              <Option value="Mong Kok">Mong Kok</Option>
              <Option value="Causeway Bay">Causeway Bay</Option>
              <Option value="Sha Tin">Sha Tin</Option>
              <Option value="Yuen Long">Yuen Long</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            { loadingForm ? ( <LoadingOutlined spin /> ):( <>
            <Button icon={<EditOutlined />} type="primary" htmlType="submit">
              Confirm Edit
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
  }}
}

export default UpdateDogForm;