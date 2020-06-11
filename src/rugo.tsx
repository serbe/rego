import React from 'react';
import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
// import { rwsContext } from './helpers/utils';
import './rugo.css';

const Rugo = (): JSX.Element => (
  <>
    <NavBar />
    <div className="container py-4 centered-content">
      <Router />
    </div>
  </>
);

export default Rugo;
