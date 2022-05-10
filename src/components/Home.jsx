import React from 'react';
import welcome from "../public/images/welcome.jpg"
import { Link } from 'react-router-dom'
import Dog from './Dog'

function Home() {
  return (
    <div align="center">
      <br></br>
      <br></br>
      <br></br>
      <h1>Welcome to The Canine Shelter</h1>
      <Link to="Dog">
      <img src = {welcome}
        alt = "Welcome to The Canine Shelter"
        width = "80%"/>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default Home;