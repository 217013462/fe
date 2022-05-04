import React from 'react';
import http from '../common/http-common.js'
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Select } from 'antd';
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';


function Profile(props) {  
  const authLogin = localStorage.getItem("auth");
  const authUser = localStorage.getItem("user");
  const loggedUser = JSON.parse(authUser);
  
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(()=> {
    http.get(`/user/${loggedUser.username}`, {
      headers: {
        'Authorization': `Basic ${authLogin}`
      }})
    .then((response)=>{
      setUser(response.data[0])
    }).then(()=>{setLoading(false)
    })
  }, []);

  if(loading){
    const antIcon = <LoadingOutlined spin />;
    return (<div align="center"><Spin tip="Loading Profile..." indicator = {antIcon}/></div>)
  } else {
  if(!user){
    return (
      <NotFound />
    )
  } else { /* 
    console.log(`Welcome ${user.username}`) */
    return(
        <>
          <div align="center">
            <br></br>
            <br></br>
            <br></br>
            <h3>Username: <b>{user.username}</b></h3>
            { (user.firstname !== "") && <p>First Name: <b>{user.firstname}</b></p> }
            { (user.lastname !== "") && <p>Last Name: <b>{user.lastname}</b></p> }
            <p>Email: <b>{user.email}</b></p>
            <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
            <br></br>
            <br></br>
          </div>
        </>
      );
    }
  }
}
export default Profile;