import './rugo.css';

import React, { useEffect } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { CJson, getStorage, useAuthState } from './helpers/auth';
import { Router } from './helpers/router';
import { useWebSocketState } from './helpers/websocket';

const Rugo = (): JSX.Element => {
  const { ws } = useWebSocketState();
  const { auth, setAuth } = useAuthState();

  const { name, token, role } = getStorage();

  useEffect(() => {
    if (ws.CONNECTING && token && token !== '') {
      ws.addEventListener('message', (message: MessageEvent) => {
        const text = message.data as string;
        const jsonData = JSON.parse(text) as CJson;
        console.log('rugo', jsonData);
        if (jsonData.r) {
          setAuth({
            type: 'SetAuth',
            data: {
              role: role,
              name: name,
              token: token,
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
      ws.send(`{ "t": "${token}", "r": "${role}" })`);
    } else {
      setAuth({
        type: 'ClearAuth',
      });
    }
  }, [name, role, setAuth, token, ws]);

  // useEffect(() => {
  //   if (auth.checked && auth.login) {
  //     setAuth({
  //       type: 'SetAuth',
  //       data: authState,
  //     });
  //   } else if (!authState.login) {
  //     setAuth({
  //       type: 'ClearAuth',
  //     });
  //   } else {
  //     console.log(authState);
  //   }
  // }, [auth.checked, auth.login, authState, setAuth]);

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
