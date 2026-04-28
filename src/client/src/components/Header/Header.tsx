import { NavLink } from 'react-router-dom';

import './Header.css';

import logo from '../../assets/logo.svg';

export const Header = () => {
  const NAV_LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/profile', label: 'Profile', end: false },
    { to: '/sign-in', label: 'Sign In', end: false },
    { to: '/log-in', label: 'Log in', end: false },
  ];

  return (
    <>
      <header className="Header">
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <nav className="navigation">
          <ul className="menu">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to} className="link">
                <NavLink to={to} end={end}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};
