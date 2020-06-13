import React from 'react';
import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import { Socket } from './helpers/socket';
import './rugo.css';

const Rugo = (): JSX.Element => {
  return (
    <Socket>
      <NavBar />
      <div className="container py-4 centered-content">
        <Router />
      </div>
    </Socket>
  );
};

export default Rugo;
