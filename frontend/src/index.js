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
import Wineries from './components/Vinarija'
import ShoppingCart from './components/shopping-cart/shoppingCart'
import { AuthProvider } from './components/authentication/AuthContext';
import Footer from './components/fragments/footer'
import axios from 'axios';


axios.interceptors.request.use(
  config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App /> }/>
        <Route path="/login" element={<Login /> }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/wines" element={<Wines/>}/>
        <Route path="/wineries" element={<Wineries/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);