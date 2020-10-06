import './rego.css';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { NavBar } from './components/navbar';
import { AuthState, checkAuthWSListener, ReducerActions, useAuthState } from './helpers/auth';
import { Router } from './helpers/router';
import { URL, useWebSocketState } from './helpers/websocket';

// import { Login } from './components/login';
const MAX_RETRY = 5;

const startWS = (
  auth: AuthState,
  setWs: Dispatch<SetStateAction<WebSocket>>,
  setAuth: Dispatch<ReducerActions>,
  setError: Dispatch<SetStateAction<boolean>>,
  setChecked: Dispatch<SetStateAction<boolean>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const webs = new WebSocket(URL);
  setError(false);
  webs.addEventListener('open', () => {
    console.log('ws open');
    setOpen(true);
    webs.send(`{ "t": "${auth.token}", "r": ${auth.role} }`);
  });
  webs.addEventListener('error', (event: Event) => {
    console.log('ws error', event);
    setOpen(false);
    setError(true);
  });
  webs.addEventListener('close', (event: Event) => {
    console.log('ws close', event);
    setOpen(false);
    setError(true);
  });
  webs.addEventListener('message', (message: MessageEvent) =>
    checkAuthWSListener(message, setAuth, setChecked),
  );
  setWs(webs);
};

export const Rego = (): JSX.Element => {
  const { auth, setAuth } = useAuthState();
  const [retry, setRetry] = useState(0);
  const [checked, setChecked] = useState(false);
  const { ws, setWs } = useWebSocketState();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    startWS(auth, setWs, setAuth, setError, setChecked, setOpen);
    setRetry(retry + 1);

    return () => {
      ws.close();
      console.log('exit from rugo');
    };
  }, []);

  useEffect(() => {
    if (error && !open && retry < MAX_RETRY) {
      startWS(auth, setWs, setAuth, setError, setChecked, setOpen);
      setRetry(retry + 1);
    }
  }, [error && open]);

  useEffect(() => {
    console.log('ws.readyState', ws.readyState);
    // if (ws.readyState === 1) {
    //   console.log('set checkAuthWSListener');
    //   ws.addEventListener('message', (message: MessageEvent) =>
    //     checkAuthWSListener(message, setAuth, setChecked),
    //   );
    //   setWs(ws);
    //   // ws.send(`{ "t": "${auth.token}", "r": ${auth.role} })`);
    // }
    // return () => {
    //   if (ws.url === URL) {
    //     ws.removeEventListener('message', (message: MessageEvent) =>
    //       checkAuthWSListener(message, setAuth, setChecked),
    //     );
    //   }
    // };
  }, [ws.readyState]);

  // useEffect(() => {
  //   console.log('rego checked', checked);
  // }, [checked]);

  // useEffect(() => {
  //   console.log('rego error', error);
  // }, [error]);

  // useEffect(() => {
  //   console.log('rego open', open);
  // }, [open]);

  // useEffect(() => {
  //   console.log('rugo useeffect out ws', auth);

  //   if (ws.current === undefined) {
  //     ws.current = new WebSocket(URL);
  //     startWS(ws.current, setAuth);
  //   }

  //   if (ws.current) {
  //     ws.current.addEventListener('close', () => {
  //       setRetry(retry + 1);
  //       if (retry < MAX_RETRY) {
  //         ws.current = new WebSocket(URL);
  //         startWS(ws.current, setAuth);
  //       }
  //     });
  //   }

  //   return (): void => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   };
  // }, [ws, auth.checked, auth, setAuth, retry]);

  const AppData = () => (
    // auth.login && !error && auth.role > 0 ? (
    <>
      <NavBar />
      <div className="container py-4 centered-content">
        <Router />
      </div>
    </>
  );
  // ) : (
  //   <Login />
  // );

  return <AppData />;
};
