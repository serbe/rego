import './rego.css';

import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { NavBar } from './components/navbar';
import { Router } from './components/routes';
import { useAuthState } from './services/auth';
import { checkStorage } from './services/storage';

const Rego = (): JSX.Element => {
  const { setAuth } = useAuthState();
  const [checker, setChecker] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    checkStorage(setChecker, setLogin);
  }, []);

  useEffect(() => {
    if (checker) {
      setAuth({ type: 'Checked' });
      if (login) {
        setAuth({ type: 'SetLogin', data: login });
      }
    }
  }, [checker, login, setAuth]);

  return checker ? (
    <BrowserRouter>
      <NavBar />
      <div className="container px-4 py-4">
        <Router />
      </div>
    </BrowserRouter>
  ) : (
    <div>loading...</div>
  );
};

export default Rego;
