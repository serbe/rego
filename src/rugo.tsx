import './rugo.css';

import React, { useEffect, useReducer, useState } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { AuthContext, CheckStorage, initialState, reducer } from './helpers/auth';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  const [loading, setloading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    CheckStorage({ dispatch: dispatch })
      .then(() => setloading(true))
      .catch(() => setloading(true));
  }, [dispatch]);

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  useEffect(() => {
    console.log('state.checked', state.checked);
  }, [state.checked]);

  useEffect(() => {
    console.log('loading', loading);
  }, [loading]);

  const Content = () =>
    state.checked ? (
      <AuthContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <div className="container py-4 centered-content">
          <Router />
        </div>
      </AuthContext.Provider>
    ) : (
      <Login dispatch={dispatch} />
    );

  return loading ? <Content /> : <div>Loading...</div>;
};

export default Rugo;
