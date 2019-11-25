import React, { FC } from 'react';

import { Router } from './containers/Router';
import { NavBar } from './components/navbar';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

import './App.css';

const App: FC = () => {
  return (
    <>
      <NavBar />
      <section className="section">
        <Container>
          <Router />
        </Container>
      </section>
      <footer className="footer">
        <Container>
          <p>© 2019 Сочи</p>
        </Container>
      </footer>
    </>
  );
};

export default App;
