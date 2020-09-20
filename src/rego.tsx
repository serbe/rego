import './rego.css';

import React, { Dispatch, useEffect, useRef, useState } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { CJson, getStorage, ReducerActions, useAuthState } from './helpers/auth';
import { URL } from './helpers/fetcher';
import { Router } from './helpers/router';

const MAX_RETRY = 5;

const startWS = (ws: WebSocket, setAuth: Dispatch<ReducerActions>) => {
  const { name, token, role } = getStorage();

  ws.addEventListener('message', (message: MessageEvent) => {
    const text = message.data as string;
    const jsonData = JSON.parse(text) as CJson;
    console.log('rugo in ws', jsonData);
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
};

export const Rego = (): JSX.Element => {
  const { auth, setAuth } = useAuthState();
  const [retry, setRetry] = useState(0);

  const ws = useRef<WebSocket>();

  useEffect(() => {
    console.log('rugo useeffect out ws', auth);

    if (ws.current === undefined) {
      ws.current = new WebSocket(URL);
      startWS(ws.current, setAuth);
    }

    if (ws.current) {
      ws.current.addEventListener('close', () => {
        setRetry(retry + 1);
        if (retry < MAX_RETRY) {
          ws.current = new WebSocket(URL);
          startWS(ws.current, setAuth);
        }
      });
    }

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ws, auth.checked, auth, setAuth, retry]);

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
