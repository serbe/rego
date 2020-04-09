import React, { FC } from 'react';

import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import './rugo.css';

const Rugo: FC = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-2">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
