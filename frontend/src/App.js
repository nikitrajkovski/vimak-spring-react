import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route, Router} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/Login';
import Register from './components/Register';
import Wines from './components/Vina'
import ShoppingCart from './components/shopping-cart/shoppingCart'

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

function App() {
  
 
  const [wines, setWines] = useState();

  const getWines = async () => {
    try {
      const response = await api.get("/api/v1/wines");


      setWines(response.data);

    } 
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWines();
  },[]);

  return (
    <div className="App">
              {/* <AuthProvider> */}
      <Routes>
        
      <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home wines={wines} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/wines" element={<Wines/>}/>
            <Route path="/shopping-cart" element={<ShoppingCart/>}/>
        </Route>
        
      </Routes> 
      {/* </AuthProvider> */}

    </div>
  );
}

export default App;
