import ItemPrice from "../common/itemPrice";
import ProductItem from "./productItem";
import './shoppingCart.css'
import { useState, useEffect, useContext } from 'react';
import api from '../../api/axiosConfig';
import Navbar from "../hero/navbar";
import {useNavigate} from 'react-router-dom'


// axios call of shopping cart
// add that inside component and products inherit inside productItem
export default function ShoppingCart() {
  const navigate = useNavigate();
  const cartid = localStorage.getItem("cartid");
  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
  const [productCounters, setProductCounters] = useState({});

  const getShoppingCart = async () => {
    try {
      const response = await api.get(`/api/v1/shopping-cart/${cartid}`);
      setShoppingCartProducts(response.data?.wines || []);
      const counters = {};
      response.data.wines.forEach(product => {
        counters[product.id] = product.quantity;
      });
      setProductCounters(counters);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShoppingCart();
  }, []);

  const handleProductDeleted = async (deletedProductId) => {
    try {
      await api.post(`/api/v1/shopping-cart/delete-product/${cartid}/${deletedProductId}`);
      setShoppingCartProducts(prevProducts => prevProducts.filter(product => product.id !== deletedProductId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCounterChange = (productId, newCounter) => {
    setProductCounters(prevCounters => ({
      ...prevCounters,
      [productId]: newCounter
    }));
  };

  const handleContinueShopping = () => {
    navigate('/wines');
  };

  const handleProceedCheckout = async () => {
    if (shoppingCartProducts.length === 0) {
      alert("Cannot proceed to checkout with an empty shopping cart.");
      return;
    }

    try {
      await api.post(`/api/v1/shopping-cart/clear/${cartid}`);
      setShoppingCartProducts([]);
      alert('Purchase was successful!');
    } catch (error) {
      console.log(error);
    }
  };

  const totalItemPrice = shoppingCartProducts.reduce((total, product) => {
    const productPrice = product.wine_price * (productCounters[product.id] || 1);
    return total + productPrice;
  }, 0);

  return (
    <div className="shopping-cart-component-wrapper-styling">
      <Navbar />
      <div className="shoping-cart-wrapper-styling">
        {shoppingCartProducts.map((product) => (
          <ProductItem
            key={product.id}
            productId={product.id}
            name={product.wine_name}
            price={product.wine_price}
            type={product.wine_type}
            winary={product.winery}
            onDelete={handleProductDeleted}
            onCounterChange={handleCounterChange} // Pass counter change handler
          />
        ))}
        <ItemPrice name={'Total'} price={totalItemPrice} />
        <div className="buttons-wrapper">
          <button className="button-styling" onClick={handleProceedCheckout}>Proceed to checkout</button>
          <button  className="button-styling" onClick={handleContinueShopping}>Continue shopping</button>
        </div>
      </div>
    </div>
  );
}