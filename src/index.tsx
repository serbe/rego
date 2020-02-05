import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Rugo from './rugo';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Rugo />
  </BrowserRouter>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
