import React from 'react';
import { Router } from './containers/Router';

import { NavBar } from './components/navbar';
import './rugo.css';

const Rugo = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container pv1 mwt">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
