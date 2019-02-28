import React from 'react';

import NavBar from './components/NavBar'
import Router from './containers/Router'

import './App.css';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <section className="section pt1">
          <Router />
        </section>
        <footer className="footer bot">
          <div className="container">
            <div className="content has-text-centered">© 2019 Сочи</div>
          </div>
        </footer>
      </div>
    );
  }
}

// export default App;
