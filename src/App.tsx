import React from 'react';
import { NavBar } from "./components/navbar";
import Router from "./containers/Router";

import './App.css';

const App: React.FC = () => {
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

export default App;
