import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
const Navbar: React.FC = () => {
  const location = useLocation();
  return (

    <nav className="navbar">
      <h2 className="logo">
        <Link to="/"> Disaster-Management</Link>
        </h2>
      <ul className="nav-links">
          
        <li className={location.pathname === '/incidents' ? 'active' : ''}>
          <Link to="/News">News</Link>
        </li>
        <li className='myName'>
            GS
        </li>
      </ul>
     
    </nav>
        
  );
};

export default Navbar;
