import React, { useState } from 'react';
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';

const drawerWidth = 240;

interface NavListProps {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const navList: NavListProps[] = [
  { name: 'Контакты', href: '/contacts' },
  { name: 'Организации', href: '/companies' },
  { name: 'Сирены', href: '/sirens' },
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

export function NavBar(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
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
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={(): void => {
              history.push('/');
            }}
          >
            ЕДДС
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
