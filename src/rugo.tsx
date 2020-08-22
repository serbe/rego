import './rugo.css';

import React, { useEffect, useReducer } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { AuthContext, CheckStorage, initialState, reducer } from './helpers/auth';
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
        <div className="container px-4 py-4">
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
