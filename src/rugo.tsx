import React, { FC } from 'react';
import { Router } from './containers/Router';

import { NavBar } from './components/navbar';
import './rugo.css';

const Rugo: FC = () => {
  return (
    <>
      <NavBar />
      <div className="container pv1">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
