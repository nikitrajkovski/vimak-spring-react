import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/hero/navbar'
import Register from './components/Register';
import Wines from './components/Vina'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App /> }/>
        <Route path="/login" element={<Login /> }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/wines" element={<Wines/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);