import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Archive } from '@material-ui/icons';
import {
  Drawer,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

// const drawerWidth = 240;

interface NavListProps {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const navList: NavListProps[] = [
  { name: 'Отделы', href: '/departments' },
  { name: 'Обучение', href: '/educations' },
  { name: 'Типы', href: '/kinds' },
  { name: 'Должности', href: '/posts' },
  { name: 'Учения', href: '/practices' },
  { name: 'Чины', href: '/ranks' },
  { name: 'Сферы', href: '/scopes' },
  { name: 'Удостоверения', href: '/certificates' },
  { name: 'Типы сирен', href: '/sirentypes' },
];

function NavbarNotLogged(): JSX.Element {
  return (
    <div className="navbar-brand">
      <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
        Авторизация
      </NavLink>
    </div>
  );
}

function NavbarEnd(): JSX.Element {
  return (
    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a href="#user" className="navbar-link">
          name
        </a>
        <div className="navbar-dropdown is-right">
          <div className="navbar-item">
            <Button color="inherit">Выход</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarStart(): JSX.Element {
  const history = useHistory();
  return (
    <>
      <Typography
        variant="h6"
        style={{ flexGrow: 1 }}
        onClick={(): void => {
          history.push('/contacts');
        }}
      >
        Контакты
      </Typography>
      <NavLink activeClassName="is-active" className="navbar-item" to="/companies">
        Организации
      </NavLink>
      <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
        Сирены
      </NavLink>
    </>
  );
}

export function NavBar(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  // const [auth, setAuth] = useState(true);
  // const auth = true;
  const [open, setOpen] = useState(false);

  // const handleDrawerOpen = (): void => {
  //   setOpen(true);
  // };
  const toggleDrawer = (event: KeyboardEvent | MouseEvent): void => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(!open);
  };

  const list = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {navList.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon ? item.icon : <Archive />}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={(): void => {
            history.push('/');
          }}
        >
          ЕДДС
        </Typography>
        <NavbarStart />
      </Toolbar>
    </AppBar>
  );
}
