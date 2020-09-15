import './rugo.css';

import React, { useEffect } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { CheckStorage, useAuthState, AuthProvider } from './helpers/auth';
import { URL } from './helpers/fetcher';
import { Router } from './helpers/router';
import { useWebSocketState, WebSocketProvider } from './helpers/websocket';

const Rugo = (): JSX.Element => {
  const { ws, setWs } = useWebSocketState();
  const { auth } = useAuthState();

  useEffect(() => {
    setWs(new WebSocket(URL));
  }, [setWs]);

  useEffect(() => {
    if (ws) {
      CheckStorage();
    }
  }, [ws]);

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

  return (
    <WebSocketProvider>
      <AuthProvider>{auth.checked ? <Content /> : <div>Loading...</div>}</AuthProvider>
    </WebSocketProvider>
  );
};

export default Rugo;
