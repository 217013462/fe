import React from 'react';
import http from '../common/http-common.js'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Select } from 'antd';
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import NotFound from './NotFound'

function DetailDogAdmin(props) {  
  const { id } = useParams();  
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [dog, setDog] = React.useState(null);
  React.useEffect(()=> {
    http.get(`/dog/${id}`)
    .then((response)=>{
      setDog(response.data)
    }).then(()=>{setLoading(false)
    })
  }, []);

  if(loading){
    const antIcon = <LoadingOutlined spin />;
    return (<div align="center"><Spin tip="Loading Selected Dog..." indicator = {antIcon}/></div>)
  } else {
  if(!dog){
    return (
      <NotFound />
    )
  } else { 
    console.log(dog)
    return(
        <>
          <div align="center">
            <br></br>
            <br></br>
            <h2>Dog ID: <b>{dog._id}</b></h2>
            <br></br>
            <img src={dog.imageURL} alt={dog.name} />
            <br></br>
            <h3>Breed: <b>{dog.breed}</b></h3>
            { (dog.name !== "") && <p>Name: <b>{dog.name}</b></p> }
            <p>Gender: <b>{dog.gender}</b></p>
            { (dog.birthdate !== "") && <p>Birth Date: <b>{dog.birthdate}</b></p> }
            <p>Location: <b>{dog.location}</b></p>
            <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
            <br></br>
            <br></br>
          </div>
        </>
      );
    }
  }
}
export default DetailDogAdmin;