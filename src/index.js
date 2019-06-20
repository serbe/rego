import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import CssBaseline from '@material-ui/core/CssBaseline';
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

// import "./index.scss";
// import './index.css';

ReactDOM.render(
  <ThemeProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
