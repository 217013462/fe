import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin, Select, Input } from 'antd';
import http from '../common/http-common.js';
import { LoadingOutlined } from '@ant-design/icons';

function Dog() {

  const [loading, setLoading] = React.useState(true);
  const [dog, setDog] = React.useState(null);
  React.useEffect(()=>{
    http.get('/dog')
    .then((response)=>{
      setDog(response.data);
    }).then(()=>{setLoading(false)
    })
  }, []);

  const [searchBreed, setSearchBreed] = React.useState('');
  
  if(loading){
    const antIcon = <LoadingOutlined spin />;
    return (<div align="center"><Spin tip="Loading Avaliable Dogs..." indicator = {antIcon}/></div>)
  } else {
    if(!dog){
      return (
        <div>There is no dog available for adoption now.</div>
      )
    } else {
      return (
        <>
          <div align="center">
            <br></br>
            <h1>Dogs Available for Adoption</h1>
            <br></br>
            <Input.Search placeholder="Search for Breed"
              allowClear
              style={{ width: 400 }}
              onChange={event => setSearchBreed(event.target.value)}
            />
            <br></br>
            <br></br>
            <Row justify="space-around">
              {
                dog && dog.filter((val)=> {
                  if (searchBreed =="") {
                    return val
                  } else if (val.breed.toLowerCase().includes(searchBreed.toLowerCase())) {
                    return val
                  }
                }).map(({_id, breed, location, imageURL})=> (
                  <Col span={6} key={_id}>
                    <Link to={`/dog/${_id}`}> 
                      <Card hoverable
                        cover = {<img alt="dogImage" src={imageURL}/>}
                        title={name}
                        style={{ width: "80%" }}
                        bordered={true}>
                        <p>Breed: {breed}</p>
                        <p>Location: {location}</p>
                      </Card>
                    </Link>
                  </Col>))
              }
            </Row>
          </div>
        </>);
    }
  }
}

export default Dog