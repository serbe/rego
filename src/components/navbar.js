/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import NotificationsIcon from '@material-ui/icons/Notifications';

// import PropTypes from "prop-types";

// function toggleOpen() {
//   return (previousState, currentProps) => {
//     return { ...previousState, open: !previousState.open };
//   };
// }

const drawerListItems = (
  <div>
  <ListItem key="departments">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/departments"
      >
        Отделы
      </NavLink>
    </ListItem>
    <ListItem key="educations">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/educations"
      >
        Обучение
      </NavLink>
    </ListItem>
    <ListItem key="kinds">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/kinds"
      >
        Типы
      </NavLink>
    </ListItem>
    <ListItem key="posts">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/posts"
      >
        Должности
      </NavLink>
    </ListItem>
    <ListItem key="practices">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/practices"
      >
        Учения
      </NavLink>
    </ListItem>
    <ListItem key="ranks">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/ranks"
      >
        Чины
      </NavLink>
    </ListItem>
    <ListItem key="scopes">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
         to="/scopes"
      >
        Сферы
      </NavLink>
    </ListItem>
    <ListItem key="certificates">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/certificates"
      >
        Удостоверения
      </NavLink>
    </ListItem>
    <Divider />
    <ListItem key="sirentypes">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/sirentypes"
      >
        Типы сирен
      </NavLink>
    </ListItem>
    </div>
);

const userItem = (
  <div>
  <ListItem key="name">
    {/* <Icon>"user"</Icon> */}
    name
  </ListItem>
  <ListItem key="exit">
    <Button color="link">Выход</Button>
  </ListItem>
</div>
)

const topItem = (
  <div>
  <ListItem key="home">

  <NavLink
    activeClassName="is-active"
    className="navbar-item"
    exact={true}
    to="/"
  >
    <ListItemIcon>
    ЕДДС
    </ListItemIcon>
  </NavLink>
</ListItem>
<ListItem key="contacts">
  <NavLink
    activeClassName="is-active"
    className="navbar-item"
    to="/contacts"
  >
    <ListItem type="contacts" />
    Контакты
  </NavLink>
</ListItem>
<ListItem key="companies">
  <NavLink
    activeClassName="is-active"
    className="navbar-item"
    to="/companies"
  >
    <ListItemIcon type="bank" />
    Организации
  </NavLink>
</ListItem>
<ListItem key="sirens">
  <NavLink
    activeClassName="is-active"
    className="navbar-item"
    to="/sirens"
  >
    <ListItemIcon type="wifi" />
    Сирены
  </NavLink>
</ListItem>
</div>
)

export default function NavBar() {
  const auth = true;
  const logged = true;
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <AppBar position="absolute" className={clsx(open)}>
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          </Toolbar>
        </AppBar>


        <Drawer
        variant="permanent"
        classes={{
        }}
        open={open}
      >
        <div>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>{drawerListItems}</List>
  </Drawer>
    </div>
  );
};
