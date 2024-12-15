import React,{useContext,useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import { loginCookiesKey, prevQuery } from '../constant';
import { getCookie } from '../utils/cookiesUtils';

function NavBar() {
    const navigate = useNavigate(); // For navigation
    const loginContext = useContext(LoginContext)
    const [isActive, setIsActive] = useState(false);
    const handleLogout = () => {
      alert('You are logging out!');
    
      // Delete cookies
      document.cookie = `${loginCookiesKey}=; max-age=0; path=/`;
      document.cookie = `${prevQuery}=; max-age=0; path=/`;
    };
    const handleClick = () => {
        handleLogout();  
        navigate('/login');
      };
    
  return (
    <nav className="navbar">
    <div className="brand-title">Moonshot</div>
    <a href="#" className="toggle-button" onClick={()=>{setIsActive(!isActive)}}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </a>
   {isActive}
    <div className={`navbar-links ${isActive ? 'active' : ''}`} >
        {
            loginContext.isLogIn ? <ul>
            <li><NavLink style={({isActive})=> {return{color: isActive? "var(--accent-color)": "var(--text-color)" , textDecoration: 'none' , marginRight: "1rem" } }} to="/dashbord">DashBord</NavLink></li>
            <li><NavLink style={({isActive})=> {return{color: isActive? "var(--accent-color)": "var(--text-color)" , textDecoration: 'none' , marginRight: "1rem" } }} onClick={handleClick} to="/login">Log Out</NavLink></li>
          </ul>: 
          <ul>
            <li><NavLink style={({isActive})=> {return{color: isActive? "var(--accent-color)": "var(--text-color)" , textDecoration: 'none' , marginRight: "1rem" } }} to="/signin">Sign Up</NavLink></li>
            <li><NavLink style={({isActive})=> {return{color: isActive? "var(--accent-color)": "var(--text-color)" , textDecoration: 'none' , marginRight: "1rem" } }} to="/login">Log In</NavLink></li>
          </ul>
        }
      
    </div>
    
  </nav>
  );
};

export default NavBar;