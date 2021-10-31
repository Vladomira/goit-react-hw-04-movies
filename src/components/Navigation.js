import { NavLink } from 'react-router-dom';
// import styles from "./Navigation.module.css";

const Navigation = () => (
  <nav className="nav__box">
    <div>
      <NavLink exact to="/" className="nav" activeClassName="nav__active">
        Home
      </NavLink>
    </div>

    <div>
      <NavLink to="/movies" className="nav" activeClassName="nav__active">
        Movies
      </NavLink>
    </div>
  </nav>
);

export default Navigation;
