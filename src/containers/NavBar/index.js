import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><NavigationMoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

class NavBar extends Component {
  // state = {
  //   logged: true,
  //   open: false,
  // };

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: true,
      open: false,
    };
  }

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  // handleLink = (e, uri) => {
  //   // e.preventDefault();
  //   this.context.router.history.push(uri);
  // }

  render() {
    return (
      <div>
        <AppBar
          title="ЕДДС"
          onLeftIconButtonClick={this.handleToggle}
          iconElementLeft={this.state.open ? <IconButton><NavigationCloseIcon /></IconButton> : <IconButton><NavigationExpandMoreIcon /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose} containerElement={<Link to="/" />}>Home</MenuItem>
          <MenuItem onClick={this.handleClose} containerElement={<Link to="/contacts" />}>Контакты</MenuItem>
          <MenuItem onClick={this.handleClose} containerElement={<Link to="/companies" />}>Организации</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;