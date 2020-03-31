import React, { FC } from 'react';

import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import { rws } from './netapi';

import './rugo.css';

const Rugo: FC = () => {
  rws.addEventListener('message', (message: unknown) => {
    console.log(message);
  });
  rws.send('hello from rugo!');
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="inset-x-0 top-0">
          <Router />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="inset-x-0 bottom-0">
          <p>© 2020 Сочи</p>
        </div>
      </div>
    </>
  );
};

export default Rugo;
