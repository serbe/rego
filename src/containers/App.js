import React, { Component } from 'react';
import BulmaNavBar from 'components/BulmaNavBar'
import Main from 'containers/Main'
// import logo from 'images/logo.svg';
import 'styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BulmaNavBar/>
        <Main />
      </div>
    );
  }
}

export default App;
