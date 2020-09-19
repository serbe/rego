import './rugo.css';

import React, { useEffect } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { CJson, getStorage, useAuthState } from './helpers/auth';
import { URL } from './helpers/fetcher';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  const { auth, setAuth } = useAuthState();
  const { name, token, role } = getStorage();

  useEffect(() => {
    console.log(auth);
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as CJson;
      console.log('rugo', jsonData);
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
    });

    ws.addEventListener('open', () => {
      ws.send(`{"t":"${token}","r":${role}}`);
    });

    return (): void => {
      ws.close();
    };
  }, [auth, name, role, setAuth, token]);

  const Content = () =>
    auth.login ? (
      <>
        <NavBar />
        <div className="container py-4 centered-content">
          <Router />
        </div>
      </>
    ) : (
      <Login />
    );

  return auth.checked ? <Content /> : <div>Loading...</div>;
};

export default Rugo;
