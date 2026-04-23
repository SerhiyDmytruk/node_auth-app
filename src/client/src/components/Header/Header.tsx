import { NavLink } from 'react-router-dom';

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
      <header>
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <nav>
          <ul>
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
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
