import './rugo.css';

import React, { useEffect, useReducer, useState } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { AuthContext, CheckStorage, initialState, reducer } from './helpers/auth';
import { URL } from './helpers/fetcher';
import { Router } from './helpers/router';
import { useWebSocketState, WebSocketProvider } from './helpers/websocket';

const Rugo = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ws, setWs } = useWebSocketState();
  const [authState, setAuthState] = useState(state);

  useEffect(() => {
    setWs(new WebSocket(URL));
  }, [setWs]);

  useEffect(() => {
    if (ws !== null) {
      CheckStorage(ws, setAuthState);
    }
  }, [setAuthState, ws]);

  useEffect(() => {
    if (authState.checked && authState.login) {
      dispatch({
        type: 'SetAuth',
        data: authState,
      });
    } else if (!authState.login) {
      dispatch({
        type: 'ClearAuth',
      });
    } else {
      console.log(authState);
    }
  }, [authState]);

  const Content = () =>
    state.login ? (
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
      <AuthContext.Provider value={{ state, dispatch }}>
        {state.checked ? <Content /> : <div>Loading...</div>}
      </AuthContext.Provider>
    </WebSocketProvider>
  );
};

export default Rugo;
