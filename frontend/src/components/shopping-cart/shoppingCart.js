import ItemPrice from "../common/itemPrice";
import ProductItem from "./productItem";
import './shoppingCart.css'
import { useState, useEffect, useContext } from 'react';
import api from '../../api/axiosConfig';
import Navbar from "../hero/navbar";

// axios call of shopping cart
// add that inside component and products inherit inside productItem
export default function ShoppingCart(){
    const [shoppingCartProducts, setShoppingCartProducts] = useState([]);

    const getShoppingCart = async () => {
      try {
        const response = await api.get("/api/v1/shopping-cart/659445cce9df798da9817616");
        console.log(response.data)
        setShoppingCartProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
        getShoppingCart();
    }, []);
  
    return (
        <div className="shopping-cart-component-wrapper-styling">
            <Navbar/>
       <div className="shoping-cart-wrapper-styling">
       {shoppingCartProducts && shoppingCartProducts.wines && shoppingCartProducts.wines.map((product) => (
          <ProductItem
            key={product.id} // Assuming you have a unique identifier for each product
            name={product.wine_name}
            price={product.wine_price}
            type={product.wine_type}
            winary={product.winery}
          />
        ))}
            <ItemPrice name={'Subtotal'} price={4500}/>
        <div className="divider"></div>
            <ItemPrice name={'Total'} price={4500}/>
            <div className="buttons-wrapper">
                <button className="button-styling">Proceed to checkout</button>
                <button className="button-styling">Continue shopping</button>
            </div>
       </div>
       </div>
    )
}