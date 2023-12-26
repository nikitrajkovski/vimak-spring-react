import Hero from '../hero/Hero.js';
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'


const Home = ({wines}) => {

  return (
    <Hero wines = {wines}/>
  )
}

export default Home
