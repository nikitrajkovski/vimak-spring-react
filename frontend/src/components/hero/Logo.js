import React, { Component } from 'react';
import slika from './image-removebg-preview.png'

export default function Logo (){
    return (
      <div className="logo-main" alt="logo">
            <img src={slika}/>
      </div>
    )
  }


