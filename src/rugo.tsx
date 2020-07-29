import './rugo.css';

import React, { useContext, useEffect, useState } from 'react';

import { Login } from './components/login';
import { NavBar } from './components/navbar';
import { AuthContext, CheckStorage } from './helpers/auth';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  const [loading, setloading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    CheckStorage()
      .then((s) => {
        dispatch({
          type: 'SetAuth',
          data: s,
        });
        return setloading(true);
      })
      .catch(() => {
        dispatch({
          type: 'ClearAuth',
        });
        return setloading(true);
      });
  }, [dispatch]);

  const Content = () =>
    state.checked ? (
      <>
        <NavBar />
        <div className="container py-4 centered-content">
          <Router />
        </div>
      </>
    ) : (
      <Login />
    );

  return loading ? <Content /> : <div>Loading...</div>;
};

export default Rugo;
