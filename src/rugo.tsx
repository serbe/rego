import React, { FC } from 'react';

import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import './rugo.css';

const Rugo: FC = () => {
  return (
    <>
      <NavBar />
      <div className="p-4">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
