/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KitchenIcon from "@material-ui/icons/Kitchen";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Router from "../containers/Router";

// import PropTypes from "prop-types";

// function toggleOpen() {
//   return (previousState, currentProps) => {
//     return { ...previousState, open: !previousState.open };
//   };
// }

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const drawerListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <KitchenIcon />
      </ListItemIcon>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/departments"
      >
        <ListItemText primary="Отделы" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/educations"
      >
        <ListItemText primary="Обучение" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink activeClassName="is-active" className="navbar-item" to="/kinds">
        <ListItemText primary="Типы" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink activeClassName="is-active" className="navbar-item" to="/posts">
        <ListItemText primary="Должности" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/practices"
      >
        <ListItemText primary="Учения" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink activeClassName="is-active" className="navbar-item" to="/ranks">
        <ListItemText primary="Чины" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink activeClassName="is-active" className="navbar-item" to="/scopes">
        <ListItemText primary="Сферы" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/certificates"
      >
        <ListItemText primary="Удостоверения" />
      </NavLink>
    </ListItem>
    <Divider />
    <ListItem button>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/sirentypes"
      >
        <ListItemText primary="Типы сирен" />
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
);

const topItem = (
  <div>
    <ListItem key="home">
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        exact={true}
        to="/"
      >
        <ListItemIcon>ЕДДС</ListItemIcon>
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
      <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
        <ListItemIcon type="wifi" />
        Сирены
      </NavLink>
    </ListItem>
  </div>
);

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <Typography variant="h6" noWrap>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        exact={true}
        to="/"
      >
        ЕДДС
      </NavLink>
      </Typography>
      <Typography variant="h6" noWrap>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/contacts"
      >
        <ListItem type="contacts" />
        Контакты
      </NavLink>
    </Typography>
    <Typography variant="h6" noWrap>
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to="/companies"
      >
        <ListItemIcon type="bank" />
        Организации
      </NavLink>
    </Typography>
    <Typography variant="h6" noWrap>
      <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
        <ListItemIcon type="wifi" />
        Сирены
      </NavLink>
    </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>{drawerListItems}</List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Router />
        <footer className="footer">
          <div className="container has-text-centered">
            <p>© 2019 Сочи</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
