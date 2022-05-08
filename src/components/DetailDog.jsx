import React, { useEffect, useState } from 'react';
import http from '../common/http-common.js'
import useAuth from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Select } from 'antd';
import { LoadingOutlined, RollbackOutlined, EditOutlined } from '@ant-design/icons';
import NotFound from './NotFound';
import DeleteDog from './DeleteDog';
import UpdateDogForm from './UpdateDogForm';

const DetailDog = (props) => {  
  const { id } = useParams();  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dog, setDog] = useState(null);
  const { auth } = useAuth();

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
            {auth.role == "admin" ?
              (<>
                <Button icon={<EditOutlined />} type="primary" onClick={(e) => navigate(`/dog/update/${dog._id}`)}>Edit</Button>
                <DeleteDog />
              </>
              ):(
                <></>
              )
            }
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
export default DetailDog;
