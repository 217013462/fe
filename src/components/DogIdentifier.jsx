import React, { useState } from 'react';
import dogapi from '../public/data/dogapi.json';
import { Card, Col, Row, Input } from 'antd';

const { Meta } = Card;

const DogIdentifier = () => {
  const [searchBreed, setSearchBreed] = useState('');
  
  return (<>
    <div align="center">
      <h1>Dog Identifier</h1>
      <br></br>
      <h3>A list of dogs with photos for eaiser breed identification</h3>
      <br></br>
      <br></br>
      <Input.Search placeholder="Search for Breed"
        allowClear
        style={{ width: 400 }}
        onChange={event => setSearchBreed(event.target.value)}
        />
      <br></br>
      <br></br>
      <Row justify="space-around">
        { dogapi &&
          dogapi.filter((val)=> {
            if (searchBreed =="") {
              return val
              } else if (val.Breed.toLowerCase().includes(searchBreed.toLowerCase())) {
              return val
              }
            }).map(({Breed, url}) => (
            <Col span={6} key={Breed}>
              <Card hoverable
                cover = {<img alt="dogImage" src={url}
                           style={{aspectRatio: 16/9, width: "100%", maxHeight: "280px"}}/>}
                title = {Breed}
                style = {{maxHeight: "350px", width: "95%"}}
                bordered = {true}>
              </Card>
            </Col>))}
      </Row>
    </div>
  </>)
}

export default DogIdentifier;