import React from 'react';
import './App.css';
import { Layout, Space } from 'antd';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom' 

import Home from './components/Home';
import Dog from './components/Dog';
import DetailDog from './components/DetailDog';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import AddDog from './components/AddDog';
import UpdateDogForm from './components/UpdateDogForm';
import Profile from './components/Profile';
import DogIdentifier from './components/DogIdentifier';
import AboutUs from './components/AboutUs';
import useAuth from './hooks/useAuth';

const App = () => {
    
  const { Header, Content, Footer } = Layout;
  const { auth, setAuth } = useAuth();
  
  const Logout = () => {
    setAuth({});
  }
  
    return (
      <Router>
        <Header>
          <nav>
            <Space>
              <div>
                {auth.username ?
                <p style={{ color:'white', width:100, fontSize:14, textAlign: "center" }}>
                  {auth.username} </p> : 
                <p style={{ color:'white', width:100, fontSize:14, textAlign: "center" }}>
                  Guest </p>}
              </div>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/dog">Dog</Link>
              <Link to="/identifier">Identifier</Link>
              {auth.username ? (<></>):(<><Link to="/register">Register</Link></>)}
              {auth.username ? (<></>):(<><Link to="/login">Login</Link></>)}
              {auth.username ? (<><Link to = "/user">Profile</Link></>):(<></>)}
              {auth.username ? (<><Link onClick={()=>Logout()} to = "/">Logout</Link></>):(<></>)}
            </Space>
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route exact path ="/" element={<Home />} />
            <Route path ="/dog" element={<Dog />} />
            <Route path ="/dog/:id" element={<DetailDog />} />
            <Route path ="/register" element={<Register/>} />
            <Route path ="/login" element={<Login/>} />
            <Route path ="*" element={<NotFound/>} />
            
            <Route path ="/adddog" element={<AddDog />} />
            <Route path ="/dog/update/:id" element={<UpdateDogForm />} />
            <Route path ="/user" element={<Profile />} />
            <Route path ="/identifier" element={<DogIdentifier />} />
            <Route path ="/about" element={<AboutUs />} />
            
          </Routes>
        </Content>
        <Footer style={{textAlign: "center"}}>
          The Canine Shelter
        </Footer>
      </Router>
    );
}

export default App;