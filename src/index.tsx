import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from './helpers/auth';
import { WebSocketProvider } from './helpers/websocket';
import { Rego } from './rego';
import * as serviceWorker from './serviceWorker';

// import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <WebSocketProvider>
        <Rego />
      </WebSocketProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
