import React, { Component } from 'react';
import BulmaNavBar from './components/NavBar'
import Main from './containers/Main'
// import logo from 'images/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BulmaNavBar/>
        <Main />
      </div>
    );
  }
}

export default App;
