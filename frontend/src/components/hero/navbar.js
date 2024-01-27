import { useAuth } from '../authentication/AuthContext.js';
import '../hero/Hero.css';
import Logo from './Logo.js'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const { authenticated, logout } = useAuth();

  const navigate = useNavigate();


  return (
    <div className='navBar'>
      <div className='Logo'>
        <Link to='/'>{authenticated ? <Logo /> : <Logo />}</Link>
      </div>
      <div className='buttons'>
        {authenticated ? (
          <>
            <Link to='/' onClick={logout}>Одјава</Link>
          </>
        ) : (
          <>
            <Link to='/login'>Најава</Link>
            <Link to='/register'>Нов Корисник</Link>
          </>
        )}
        <Link to='/wines'>Вина</Link>
        <Link to='/wineries'>Винарии</Link>
        {authenticated && <Link to='/shopping-cart'><FontAwesomeIcon icon={faCartShopping} /></Link>}
      </div>
    </div>
  );
}