
import { useAuth } from '../authentication/AuthContext';
import './Hero.css';
import Logo from './Logo.js'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
  const { authenticated, logout } = useAuth();

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
        <a id='clic' href='https://www.youtube.com/'>
          <FontAwesomeIcon icon={faCartShopping} />
        </a>
      </div>
    </div>
  );
}


// import './Hero.css';
// import Logo from './Logo.js'
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


// export default function Navbar() {
//     return (
//     <div className='navBar'>
//         <div className='Logo'>
//             <Link to="/"><Logo/></Link>
//         </div>
//         <div className='buttons'>
//           <Link to="/login">Најава</Link>
//           <Link to="/register">Нов Корисник</Link>
//           <Link to="/wines">Вина</Link>
//           <Link to='/wineries'>Винарии</Link>

//           <a id="clic" href="https://www.youtube.com/"><FontAwesomeIcon icon={faCartShopping}/></a>
//         </div>
        
//       </div>
//     )
//     }

