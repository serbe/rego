import './rego.css';

import React from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { useAuthState } from './helpers/auth';
import { Router } from './helpers/router';

const Rego = (): JSX.Element => {
  const { auth } = useAuthState();

  const Content = () =>
    auth.login ? (
      <>
        <NavBar />
        <div className="container px-4 py-4">
          <Router />
        </div>
      </>
    ) : (
      <Login />
    );

  return auth.checked ? <Content /> : <div>Loading...</div>;
};

export default Rego;
