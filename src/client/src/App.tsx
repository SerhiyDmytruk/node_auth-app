import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './modules/Layout';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProfilePage } from './modules/ProfilePage';
import { AccountPage } from './modules/AccountPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="sign-in" element={<AccountPage />} />
          <Route path="log-in" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
