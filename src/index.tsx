import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Rego from './rego';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './services/auth';

// import './index.css';

const rootNode = document.getElementById('root');

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <Rego />
    </AuthProvider>
  </React.StrictMode>
);

ReactDOM.render(<App />, rootNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
