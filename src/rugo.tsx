import React, { FC } from 'react';
import { Router } from './containers/Router';

import { NavBar } from './components/navbar';
// import './rugo.scss';

const Rugo: FC = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Router />
      </div>
    </>
  );
};

export default Rugo;
