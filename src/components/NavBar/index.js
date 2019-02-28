/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar.css"

function toggleOpen() {
  return (previousState, currentProps) => {
    return { ...previousState, open: !previousState.open };
  };
}

class NavBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: true,
      open: false,
      auth: true
    };
  }

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  onClick = () => {
    this.setState(toggleOpen());
  };

  // handleClose = () => this.setState({open: false});

  // handleLink = (e, uri) => {
  //   // e.preventDefault();
  //   this.context.router.history.push(uri);
  // }

  render() {
    return (
      <header className="row">
        <div className="uk-container uk-container-expand">
          <nav className="uk-navbar-container" uk-navbar="true  ">
            {this.state.auth ? (
              <React.Fragment>
                <div className="uk-navbar-left">
                  <NavLink to="/" className="uk-navbar-item uk-logo">
                    ЕДДС
                  </NavLink>
                  <ul className="uk-navbar-nav">
                    <li>
                      <NavLink to="/contacts">Контакты</NavLink>
                    </li>
                    <li>
                      <NavLink to="/companies">Организации</NavLink>
                    </li>
                    <li>
                      <NavLink to="/sirens">Сирены</NavLink>
                    </li>
                    <li>
                      <a href="#">Справочники</a>
                      <div className="uk-navbar-dropdown">
                        <ul className="uk-nav uk-navbar-dropdown-nav">
                          <li>
                            <NavLink
                              to="/departments"
                              onClick={this.handleToggle}
                            >
                              Отделы
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/educations"
                              onClick={this.handleToggle}
                            >
                              Обучение
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/kinds" onClick={this.handleToggle}>
                              Типы
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/posts" onClick={this.handleToggle}>
                              Должности
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/practices"
                              onClick={this.handleToggle}
                            >
                              Учения
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/ranks" onClick={this.handleToggle}>
                              Чины
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/scopes" onClick={this.handleToggle}>
                              Сферы
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/certificates"
                              onClick={this.handleToggle}
                            >
                              Удостоверения
                            </NavLink>
                          </li>
                          <li className="uk-nav-divider" />
                          <li>
                            <NavLink
                              to="/sirentypes"
                              onClick={this.handleToggle}
                            >
                              Типы сирен
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav">
                    <li>
                      <a href="#">name</a>
                      <div className="uk-navbar-dropdown">
                        <div className="uk-navbar-item">
                          <button className="uk-button uk-button-default">
                            Выход
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            ) : (
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                  <NavLink to="/login" key="NavbarNotLogged">
                    Авторизация
                  </NavLink>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
