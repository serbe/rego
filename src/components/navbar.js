/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import Button from "./button";
import PropTypes from "prop-types";

function toggleOpen() {
  return (previousState, currentProps) => {
    return { ...previousState, active: !previousState.active };
  };
}

export class NavBar extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false,
      auth: true,
      logged: true,
      open: false
    };
  }

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  handleToggle = () => {
    this.setState(toggleOpen());
  };

  // handleClose = () => this.setState({open: false});

  // handleLink = (e, uri) => {
  //   // e.preventDefault();
  //   this.context.router.history.push(uri);
  // }

  render() {
    const navMenu = () => {
      return clsx([
        "navbar-item",
        "has-dropdown",
        "is-hoverable"
      ]);
    };

    return (
      <nav
        aria-label="main navigation"
        className="navbar is-dark"
        role="navigation"
      >
        <div className="container">
          {this.state.auth ? (
            <React.Fragment>
              <div className="navbar-brand">
                <NavLink
                  activeClassName="is-active"
                  className="navbar-item"
                  exact={true}
                  to="/"
                >
                  ЕДДС
                </NavLink>

                <a
                  aria-expanded="false"
                  aria-label="menu"
                  className="navbar-burger burger"
                  data-target="navbarData"
                  role="button"
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </a>
              </div>

              <div id="navbarData" className="navbar-menu">
                <div className="navbar-start">
                  <NavLink
                    activeClassName="is-active"
                    className="navbar-item"
                    to="/contacts"
                  >
                    Контакты
                  </NavLink>
                  <NavLink
                    activeClassName="is-active"
                    className="navbar-item"
                    to="/companies"
                  >
                    Организации
                  </NavLink>
                  <NavLink
                    activeClassName="is-active"
                    className="navbar-item"
                    to="/sirens"
                  >
                    Сирены
                  </NavLink>

                  <div className={navMenu()}>
                    <a href="#" className="navbar-link">
                      Справочники
                    </a>
                    <div className="navbar-dropdown">
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/departments"
                      >
                        Отделы
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/educations"
                      >
                        Обучение
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/kinds"
                      >
                        Типы
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/posts"
                      >
                        Должности
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/practices"
                      >
                        Учения
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/ranks"
                      >
                        Чины
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/scopes"
                      >
                        Сферы
                      </NavLink>
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/certificates"
                      >
                        Удостоверения
                      </NavLink>
                      <hr className="navbar-divider" />
                      <NavLink
                        activeClassName="is-active"
                        className="navbar-item"
                        onClick={this.handleToggle}
                        to="/sirentypes"
                      >
                        Типы сирен
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="navbar-end">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a href="#" className="navbar-link">
                      name
                    </a>
                    <div className="navbar-dropdown is-right">
                      <div className="navbar-item">
                        <Button color="link">Выход</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="navbar-brand">
              <NavLink
                className="navbar-item"
                key="NavbarNotLogged"
                to="/login"
              >
                Авторизация
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
