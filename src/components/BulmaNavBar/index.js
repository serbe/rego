import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BulmaNavBar extends Component {
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
    let navBurgerClass = "navbar-burger burger";
    if (this.open === false) {
      navBurgerClass =  navBurgerClass + 'is-active';
    }
    let navMenuClass = "navbar-menu";
    if (this.open === false) {
      navMenuClass =  navMenuClass + 'is-active';
    }

    return (
      <div className="container">
      <nav className="navbar">
        <div className="navbar-brand">
          <template v-if="user.authenticated">
            <router-link to="/" className="navbar-item" exact>ЕДДС</router-link>
            <router-link to="/contacts" className="navbar-item">Контакты</router-link>
            <router-link to="/companies" className="navbar-item">Организации</router-link>
          </template>
          <router-link v-else to="/login" className="navbar-item" key="NavbarNotLogged">Авторизация</router-link>
          <div className={navBurgerClass} data-target="navMenu" onClick={this.handleToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navMenu" className={navMenuClass}>
          <div className="navbar-start">
            <template v-if="user.authenticated">
              <router-link to="/sirens" className="navbar-item">Сирены</router-link>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Справочники</a>
                <div className="navbar-dropdown">
                  <router-link to="/departments" className="navbar-item" onClick={this.handleToggle}>Отделы</router-link>
                  <router-link to="/educations" className="navbar-item" onClick={this.handleToggle}>Обучение</router-link>
                  <router-link to="/kinds" className="navbar-item" onClick={this.handleToggle}>Типы</router-link>
                  <router-link to="/posts" className="navbar-item" onClick={this.handleToggle}>Должности</router-link>
                  <router-link to="/practices" className="navbar-item" onClick={this.handleToggle}>Учения</router-link>
                  <router-link to="/ranks" className="navbar-item" onClick={this.handleToggle}>Чины</router-link>
                  <router-link to="/scopes" className="navbar-item" onClick={this.handleToggle}>Сферы</router-link>
                  <router-link to="/certificates" className="navbar-item" onClick={this.handleToggle}>Удостоверения</router-link>
                  <hr className="navbar-divider"/>
                  <router-link to="/sirentypes" className="navbar-item" onClick={this.handleToggle}>Типы сирен</router-link>
                </div>
              </div>
            </template>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              {/* <a className="navbar-link">{{ user.name }}</a> */}
              <div className="navbar-dropdown is-right">
                <bulma-button v-if="user.authenticated" className="navbar-item" text="Выход" color="info" onClick={this.handleToggle} key="user"></bulma-button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    );
  }
}

export default BulmaNavBar;