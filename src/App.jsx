import React from 'react';
import './App.css';
import { Layout, Space } from 'antd';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 

import Home from './components/Home';
import Dog from './components/Dog';
import DetailDog from './components/DetailDog';
import Register from './components/Register';
import Login from './components/Login';
import AddDog from './components/AddDog';

const {Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dog">Dog</Link>
            <Link to="/adddog">Add Dog</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>            
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route exact path ="/" element={<Home />} />
          <Route path ="/dog" element={<Dog />} />
          <Route path ="/adddog" element={<AddDog />} />
          <Route path ="/dog/:id" element={<DetailDog />} />
          <Route path ="/register" element={<Register/>} />
          <Route path ="/login" element={<Login/>} />
        </Routes>
      </Content>
      <Footer style={{textAlign: "center"}}>
        The Canine Shelter
      </Footer>
    </Router>

    
  );
}

export default App;