import React from 'react';
import './App.css';
import { Layout, Space } from 'antd';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 

import Home from './components/Home';
import Dog from './components/Dog';
import DetailDog from './components/DetailDog';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import AddDog from './components/AddDog';
import Profile from './components/Profile';
import DetailDogAdmin from './components/DetailDogAdmin';
import UpdateDogForm from './components/UpdateDogForm';

const {Header, Content, Footer } = Layout;

const Logout = () => {
    localStorage.clear();
  }

function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dog">Dog</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link onClick={Logout} to = "/">Logout</Link>
            <Link to="/adddog">Add Dog</Link>
            <Link to="/profile">Profile</Link>
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
          <Route path ="/dog/admin/:id" element={<DetailDogAdmin />} />
          <Route path ="/dog/update/:id" element={<UpdateDogForm />} />
          <Route path ="/profile" element={<Profile/>} />
          

        </Routes>
      </Content>
      <Footer style={{textAlign: "center"}}>
        The Canine Shelter
      </Footer>
    </Router>

    
  );
}

export default App;