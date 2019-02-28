import React from 'react';

import NavBar from './components/NavBar'
import Router from './containers/Router'

import './App.css';

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="row">
          <Router />
        </div>
        <footer className="footer">
          <p>© 2019 Сочи</p>
        </footer>
      </React.Fragment>
    );
  }
}

// export default App;
