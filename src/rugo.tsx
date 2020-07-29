import './rugo.css';

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NavBar } from './components/navbar';
import { AuthContext, CheckStorage } from './helpers/auth';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const { dispatch } = useContext(AuthContext);

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
        setloading(true);
        history.push('/login');
        return;
      });
  }, [dispatch, history]);

  return (
    <>
      {loading && (
        <>
          <NavBar />
          <div className="container py-4 centered-content">
            <Router />
          </div>
        </>
      )}
    </>
  );
};

export default Rugo;
