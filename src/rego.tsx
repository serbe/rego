import './rego.css';

import React, { useEffect } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { CJson, getStorage, useAuthState } from './helpers/auth';
import { Router } from './helpers/router';

const Rego = (): JSX.Element => {
  const { auth, setAuth } = useAuthState();

  useEffect(() => {
    const { name, token, role } = getStorage();
    fetch('/api/go/check', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{ "t": "${token}", "r": ${role} })`,
    })
      .then((response) => response.json())
      .then((response) => response as CJson)
      .then((jsonData) => {
        if (jsonData.r) {
          setAuth({
            type: 'SetAuth',
            data: {
              role,
              name,
              token,
              login: true,
              checked: true,
            },
          });
        } else {
          setAuth({
            type: 'ClearAuth',
          });
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [setAuth]);

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
