import './rugo.css';

import React from 'react';

import { NavBar } from './components/navbar';
import { Router } from './containers/Router';

const Rugo = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container py-4 centered-content">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
