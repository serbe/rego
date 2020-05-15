import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Router } from './containers/Router';
import { Container } from '@material-ui/core';

import { NavBar } from './components/navbar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Rugo(): JSX.Element {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router />
      </main>
    </Container>
  );
}

export default Rugo;
