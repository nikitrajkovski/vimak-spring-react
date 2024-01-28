import api from '../api/axiosConfig';
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './Vina.css'; 
import Navbar from './hero/navbar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authentication/AuthContext';


export default function Vina() {
  const [wines, setWines] = useState([]);
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (idtest) => {
    if (!authenticated) {
      navigate('/login'); 
      return;
    } else {
        const stringId = idtest.toString(); // Convert ObjectId to String
        const cartid = localStorage.getItem("cartid")
        api.post(`/api/v1/shopping-cart/add-product/${cartid}/${stringId}`)
        .then(function (response) {
            alert("Успешно додадовте вино во корпата")
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}


  const getWines = async () => {
    try {
      const response = await api.get("/api/v1/wines");
      setWines(response.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getWines();
  }, []);


  return (
    <div className='background'>
      <Navbar/>
      <Container fluid>
        <Row className="wine-container">
          {wines &&
            wines.map((wine) => (
              <Col key={wine.id} lg={4} md={6} sm={12} className="wine-card-col">
                <Card className="wine-card">
                  <Card.Img
                    variant="top"
                    src={wine.wine_url}
                    alt={wine.wine_name}
                    className="wine-card-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{wine.winery} {wine.wine_name}</Card.Title>
                    <Card.Text>
                      Цена: {wine.wine_price}ден.
                    </Card.Text>
                    <Button variant="primary" className="wine-card-button" onClick={() => addToCart(wine.id)}>
                      Додај во корпа
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <hr/>
    </div>
    
  );
}
