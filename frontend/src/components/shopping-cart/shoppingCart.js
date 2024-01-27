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
  const navigate = useNavigate()
  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);

  const getShoppingCart = async () => {
    try {
      const response = await api.get("/api/v1/shopping-cart/659445cce9df798da9817616");
      setShoppingCartProducts(response.data?.wines || []); // Initialize as an empty array if no wines data is available
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShoppingCart();
  }, []);

  const handleProductDeleted = async (deletedProductId) => {
    try {
      await api.post(`/api/v1/shopping-cart/delete-product/659445cce9df798da9817616/${deletedProductId}`);
      setShoppingCartProducts(prevProducts => {
        // Ensure prevProducts is an array before calling filter
        if (Array.isArray(prevProducts)) {
          return prevProducts.filter(product => product.id !== deletedProductId);
        } else {
          console.log("Previous products is not an array:", prevProducts);
          return [];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueShopping = () => {
    navigate('/wines');
  }

  const handleProceedCheckout = async () => {
    if (shoppingCartProducts.length === 0) {
      alert("Cannot proceed to checkout with an empty shopping cart.");
      return;
    }

    try {
      await api.post('/api/v1/shopping-cart/clear/659445cce9df798da9817616');
      setShoppingCartProducts([]);
      alert('Purchase was successful!');
    } catch (error) {
      console.log(error);
    }
  };

  const totalItemPrice = shoppingCartProducts.reduce((total, product) => total + product.wine_price, 0);


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
            onDelete={handleProductDeleted} // Pass deletion handler
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