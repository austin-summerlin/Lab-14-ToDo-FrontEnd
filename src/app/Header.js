import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="Header">

        <h1><NavLink to="/">Home</NavLink></h1>

        <NavLink to="/todos">Todos</NavLink>

      </header>
    );
  }

}

export default Header;