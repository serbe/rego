import React from 'react';
import { Router } from './containers/Router';
import { Container } from '@material-ui/core';

import { NavBar } from './components/navbar';
// import './rugo.css';

function Rugo(): JSX.Element {
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Container maxWidth="lg" style={{ padding: 20 }}>
        <Router />
      </Container>
    </Container>
  );
}

export default Rugo;
