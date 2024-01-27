import React from 'react';
import Counter from '../common/counter';
import ProductDescription from './productDescription';
import './productItem.css';
import trashImage from './trash-can.png';
import api from '../../api/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function ProductItem({ productId, name, price, type, winary, onDelete }) {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const deleteProductFromCart = async (idtest) => {
    if (!authenticated) {
      navigate('/login'); 
      return;
    } else {
      const stringId = idtest.toString()
      console.log(stringId)
      await api.post(`/api/v1/shopping-cart/delete-product/659445cce9df798da9817616/${idtest}`)
      onDelete(productId)
      .catch(function (error) {
          console.log(error);
      });
  }};

  return (
    <div className='product-item-wrapper'>
      <ProductDescription name={name} type={type} winary={winary}></ProductDescription>
      <Counter></Counter>
      <p>{price}ден.</p>
      <img src={trashImage} className='trash-styling' style={{ cursor: 'pointer' }} onClick={() => deleteProductFromCart(productId)} alt="Delete" />
    </div>
  );
}

