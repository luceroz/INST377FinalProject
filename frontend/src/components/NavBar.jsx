import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link to='/' className='logo'>
          Art Gallery
        </Link>
      </div>
      <div className='navbar-center'>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/help'>Help</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-right'>
        <a href='/account' className='user-icon'>
          <i className='fas fa-user'></i>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
