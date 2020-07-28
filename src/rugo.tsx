import './rugo.css';

import React from 'react';

import { NavBar } from './components/navbar';
import { Context } from './helpers/auth';
import { Router } from './helpers/router';

const Rugo = (): JSX.Element => {
  return (
    <Context>
      <>
        <NavBar />
        <div className="container py-4 centered-content">
          <Router />
        </div>
      </>
    </Context>
  );
};

export default Rugo;
