import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign';

import ClockComponent from '../ClockComponent/ClockComponent';

const HeaderComponent = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <span className="navbar-brand"><FontAwesomeIcon icon={faDollarSign} /> Exchange Rates</span>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/">Current table (type C)</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/single">Table for chosen currency</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/time">Rates in time</NavLink>
      </li>
    </ul>
    <span className="navbar-text text-white">
      <ClockComponent />
    </span>
  </nav>
);

export default HeaderComponent;
