import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="Header">

        <h1>Todos</h1>

        <NavLink to="/todos">Todo</NavLink>

      </header>
    );
  }

}

export default Header;