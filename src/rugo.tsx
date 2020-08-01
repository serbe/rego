import './rugo.css';

import React, { useReducer, useEffect } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { AuthContext, initialState, reducer, CheckStorage } from './helpers/auth';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    CheckStorage()
      .then((s) => {
        return dispatch({
          type: 'SetAuth',
          data: s,
        });
      })
      .catch(() => {
        return dispatch({
          type: 'ClearAuth',
        });
      });
  }, []);

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
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.checked ? <Content /> : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default Rugo;
