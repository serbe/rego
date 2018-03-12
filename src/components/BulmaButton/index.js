import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class BulmaNavBar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: true,
      open: false,
      auth: true,
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
    let navBurgerClass = "navbar-burger burger";
    if (this.state.open === false) {
      navBurgerClass =  navBurgerClass + ' is-active';
    }
    let navMenuClass = "navbar-menu";
    if (this.state.open === false) {
      navMenuClass =  navMenuClass + ' is-active';
    }

    return (
      <div class="field">
        <p class="control">
          <a :class="aClassList" @click="click">
            <bulma-icon v-if="icon" :size="size" :icon="icon" :position="iconPosition" :color="color" key="ButtonIcon"/>
            <template v-if="text">{{ text }}</template>
          </a>
        </p>
      </div>
    );
  }
}

export default BulmaNavBar;