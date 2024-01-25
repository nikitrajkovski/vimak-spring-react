import api from '../api/axiosConfig';
import { useState, useEffect } from 'react';
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './Vinarija.css'; 
import Logo from './hero/Logo'
import Navbar from './hero/navbar'


export default function Vinarija() {
    const [wineries, setWinery] = useState([]);

  const getWinery = async () => {
    try {
      const response = await api.get("/api/v1/winery");
      setWinery(response.data);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWinery();
  }, []);

  return (
    <div className='background'>
      <Navbar/>
      <Container fluid>
        <Row className="winery-container">
          {wineries &&
            wineries.map((winery) => (
              <Col key={winery.id} lg={4} md={6} sm={12} className="winery-card-col">
                <Card className="winery-card">
                <Card.Img
                    variant="top"
                    src={winery.url}
                    alt={winery.winery_name}
                    className="winery-card-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{winery.winery_name}</Card.Title>
                    <Card.Text>
                      {winery.winery_location}
                    </Card.Text>

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
