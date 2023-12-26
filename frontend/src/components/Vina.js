import api from '../api/axiosConfig';
import {useState, useEffect} from 'react';
import React from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import Navbar from './hero/navbar'

export default function Vina (){

  const [wines, setWines] = useState();

  const getWines = async () => {
    try {
      const response = await api.get("/api/v1/wines");

      console.log(response.data);

      wines = setWines(response.data);

    } 
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWines();
  },[]);


  return (
<div>
      <Navbar/>
      <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop:"1em", paddingLeft:"2em" }}>
        {wines && wines.map((wine) => (
          <Card key={wine.id} style={{ width: '18rem', marginBottom: '20px', paddingRight:"1em" }}>
            <Card.Img variant="top" src={wine.wine_url} alt={wine.wine_name} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{wine.winery} {wine.wine_name}</Card.Title>
              <Card.Text>
                Цена: {wine.wine_price}ден.
              </Card.Text>
              <Button variant="primary" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Додај во корпа</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}