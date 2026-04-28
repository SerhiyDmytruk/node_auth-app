import { Outlet } from 'react-router-dom';

import './Layout.css';

import { Header } from '../../components/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
