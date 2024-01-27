import React from 'react';
import Counter from '../common/counter';
import ProductDescription from './productDescription';
import './productItem.css';
import trashImage from './trash-can.png';
import api from '../../api/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function ProductItem({ productId, name, price, type, winary, onDelete, onCounterChange }) {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const cartid = localStorage.getItem("cartid");
  const [counter, setCounter] = useState(1);

  const deleteProductFromCart = async (idtest) => {
    if (!authenticated) {
      navigate('/login');
      return;
    } else {
      try {
        await api.post(`/api/v1/shopping-cart/delete-product/${cartid}/${idtest}`);
        onDelete(productId); // Notify ShoppingCart component about deletion
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCounterChange = (newCounter) => {
    setCounter(newCounter);
    onCounterChange(productId, newCounter); // Notify ShoppingCart component about counter change
  };

  return (
    <div className='product-item-wrapper'>
      <ProductDescription name={name} type={type} winary={winary}></ProductDescription>
      <Counter counter={counter} setCounter={handleCounterChange} />      
      <p>{price}ден.</p>
      <img src={trashImage} className='trash-styling' style={{ cursor: 'pointer' }} onClick={() => deleteProductFromCart(productId)} alt="Delete" />
    </div>
  );
}