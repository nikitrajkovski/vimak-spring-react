import './Hero.css';
import Logo from './Logo.js'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';





export default function Najavabar() {
    return (
    <div className='navBar'>
        <div className='Logo'>
            <Link to=""><Logo/></Link>
        </div>
        <div className='buttons'>
          <Link to="/login">Вина</Link>
          <Link to="/login">Винарии</Link>
          <Link to="/login">Понуди</Link>
          <Link to="/register">Продавница</Link>
          <Link to="/about">За нас</Link>
          <a id="clic" href="https://www.youtube.com/"><FontAwesomeIcon icon={faCartShopping}/></a>
        </div>
        
      </div>
    )
}

