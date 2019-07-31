import { NavBar } from "./components/navbar";
import React from "react";
import Router from "./containers/Router";

import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <section className="section">
          <div className="container">
            <Router />
          </div>
        </section>
        <footer className="footer">
          <div className="container has-text-centered">
            <p>© 2019 Сочи</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
