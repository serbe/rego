import './rego.css';

import React from 'react';

import { NavBar } from './components/navbar';
import { Router } from './services/router';

const Rego = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container px-4 py-4">
        <Router />
      </div>
    </>
  );
};

export default Rego;
