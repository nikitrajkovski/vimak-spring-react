import api from '../api/axiosConfig';
import { useState, useEffect } from 'react';
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './hero/navbar';
import './Vinarija.css'; 
import Logo from './hero/Logo'


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
      <Navbar />
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
      <div className="footer">
                    <div className="f1">
                        <div id="kontakt">Контакт:</div>
                        <div className='kf1'>Е-пошта: vimak@vimak.com</div>
                        <div className='kf1'>Телефон: 070/000-000</div>
                        <br></br>
                        <div>Сите права се задржани</div>
                    </div>
                    <div className="f2">
                      <div className='f2Logo'>
                            <Logo/>
                          </div>
                    </div>
                    <div className="f3">
                    <br/>
                        <div id="politika">Политика на приватност</div>
                        <div>Услови за купување</div>
                    </div>
                </div>
    </div>
    
  );
}
