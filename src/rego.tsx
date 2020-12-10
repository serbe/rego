import './rego.css';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NavBar } from './components/navbar';
import { Router } from './components/routes';
import { checkStorage } from './services/auth';

const Rego = (): JSX.Element => {
  const history = useHistory();
  const [checker, setChecker] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    checkStorage(setChecker, setLogin);
  }, []);

  useEffect(() => {
    if (!checker && !login) {
      history.push('/login');
    }
  }, [checker, login]);

  return checker ? (
    <>
      <NavBar />
      <div className="container px-4 py-4">
        <Router />
      </div>
    </>
  ) : (
    <div>loading...</div>
  );
};

export default Rego;
