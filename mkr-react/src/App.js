import './App.css';
import Header from './components/Header';
import { Registration } from './pages/Registration';
import {  Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import React from 'react';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <div className='mainBlock'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
      
    </>
  );
}

export default App;

/* <Route path="/" element={<Home />} />
          <Route path="/tags/:name" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          
          <Route path="/user-info/:id" element={<User />} /> */