import React, { FC } from 'react';

import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import './rugo.css';

const Rugo: FC = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="inset-x-0 top-0">
          <Router />
        </div>
      </div>
    </>
  );
};

export default Rugo;
