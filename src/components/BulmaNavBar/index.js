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

  // handleClose = () => this.setState({open: false});

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
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            { this.state.auth ? (
              <React.Fragment>
                <NavLink to="/" className="navbar-item">ЕДДС</NavLink>
                <NavLink to="/contacts" className="navbar-item">Контакты</NavLink>
                <NavLink to="/companies" className="navbar-item">Организации</NavLink>
              </React.Fragment>
            ) : (
              <NavLink to="/login" className="navbar-item" key="NavbarNotLogged">Авторизация</NavLink>
            )}
            <div className={navBurgerClass} data-target="navMenu" onClick={this.handleToggle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        <div id="navMenu" className={navMenuClass}>
          <div className="navbar-start">
            { this.state.auth ? (
              <React.Fragment>
                <NavLink to="/sirens" className="navbar-item">Сирены</NavLink>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Справочники</a>
                  <div className="navbar-dropdown">
                    <NavLink to="/departments" className="navbar-item" onClick={this.handleToggle}>Отделы</NavLink>
                    <NavLink to="/educations" className="navbar-item" onClick={this.handleToggle}>Обучение</NavLink>
                    <NavLink to="/kinds" className="navbar-item" onClick={this.handleToggle}>Типы</NavLink>
                    <NavLink to="/posts" className="navbar-item" onClick={this.handleToggle}>Должности</NavLink>
                    <NavLink to="/practices" className="navbar-item" onClick={this.handleToggle}>Учения</NavLink>
                    <NavLink to="/ranks" className="navbar-item" onClick={this.handleToggle}>Чины</NavLink>
                    <NavLink to="/scopes" className="navbar-item" onClick={this.handleToggle}>Сферы</NavLink>
                    <NavLink to="/certificates" className="navbar-item" onClick={this.handleToggle}>Удостоверения</NavLink>
                    <hr className="navbar-divider"/>
                    <NavLink to="/sirentypes" className="navbar-item" onClick={this.handleToggle}>Типы сирен</NavLink>
                  </div>
                </div>
              </React.Fragment>
            ) : (<React.Fragment/>)}
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link"> user.name </a>
              <div className="navbar-dropdown is-right">
              { this.state.auth ? (
                <bulma-button className="navbar-item" text="Выход" color="info" onClick={this.handleToggle} key="user"></bulma-button>
              ) : (<React.Fragment/>)}
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