import React, { useEffect, useState } from 'react';
import http from '../common/http-common.js'
import useAuth from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Select } from 'antd';
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import NotFound from './NotFound';

const Profile = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { auth } = useAuth();


  useEffect(
    async () => {
      setLoading(true);
      const accessToken = auth.accessToken;
      try {
        const response = await http.get(`/user/${auth.username}`,{
      headers: {
        'Authorization': `Basic ${accessToken}`
      }});
        setUser(response.data[0]);
        } catch (err) {
        concole.log(err);
        }
      setLoading(false);
      }, []);

  if(loading){
    const antIcon = <LoadingOutlined spin />;
    return (<div align="center"><Spin tip="Loading User Profile..." indicator = {antIcon}/></div>)
  } else {
  if(!user){
    return (
      <NotFound />
    )
  } else { 
    console.log(user)
    return(
        <>
          <div align="center">
            <br></br>
            <br></br>
            <br></br>
            <h3>Username: <b>{user.username}</b></h3>
            { (user.firstname !== "") && <p>First Name: <b>{user.firstname}</b></p> }
            { (user.lastname !== "") && <p>Last Name: <b>{user.lastname}</b></p> }
            <p>E-mail: <b>{user.email}</b></p>
            {auth.role == "admin" ? (<><p>Location: <b>{user.location}</b></p></>):(<></>)}
            <br></br>
            <br></br>
            <Button icon={<RollbackOutlined />} onClick={()=>navigate(-1)}>Back</Button>
            <br></br>
            <br></br>
          </div>
        </>
      );
    }
  }
}
export default Profile;