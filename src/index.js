import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { createStore, combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import "./index.scss";
import './index.css';
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";

// const rootReducer = combineReducers({
  // form: formReducer,
// });

// const store = createStore(rootReducer);

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  // </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
