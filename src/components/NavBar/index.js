/* eslint-disable jsx-a11y/anchor-is-valid */
// import Button from "../Button";
import PropTypes from "prop-types";
import React from "react";
import cc from "classcat";
import { NavLink } from "react-router-dom";

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
    const navBurgerClass = cc([
      "navbar-burger",
      "burger",
      {
        "is-active": !this.state.open
      }
    ]);
    const navMenuClass = cc([
      "navbar-menu",
      {
        "is-active": !this.state.open
      }
    ]);

    return (
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            {this.state.auth ? (
              <React.Fragment>
                <NavLink to="/" className="navbar-item">
                  ЕДДС
                </NavLink>
                <NavLink to="/contacts" className="navbar-item">
                  Контакты
                </NavLink>
                <NavLink to="/companies" className="navbar-item">
                  Организации
                </NavLink>
              </React.Fragment>
            ) : (
              <NavLink
                to="/login"
                className="navbar-item"
                key="NavbarNotLogged"
              >
                Авторизация
              </NavLink>
            )}
            <div
              className={navBurgerClass}
              data-target="navMenu"
              onClick={this.handleToggle}
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenu" className={navMenuClass}>
            <div className="navbar-start">
              {this.state.auth ? (
                <React.Fragment>
                  <NavLink to="/sirens" className="navbar-item">
                    Сирены
                  </NavLink>
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">Справочники</a>
                    <div className="navbar-dropdown">
                      <NavLink
                        to="/departments"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Отделы
                      </NavLink>
                      <NavLink
                        to="/educations"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Обучение
                      </NavLink>
                      <NavLink
                        to="/kinds"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Типы
                      </NavLink>
                      <NavLink
                        to="/posts"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Должности
                      </NavLink>
                      <NavLink
                        to="/practices"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Учения
                      </NavLink>
                      <NavLink
                        to="/ranks"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Чины
                      </NavLink>
                      <NavLink
                        to="/scopes"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Сферы
                      </NavLink>
                      <NavLink
                        to="/certificates"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Удостоверения
                      </NavLink>
                      <hr className="navbar-divider" />
                      <NavLink
                        to="/sirentypes"
                        className="navbar-item"
                        onClick={this.handleToggle}
                      >
                        Типы сирен
                      </NavLink>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </div>
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link"> name </a>
                <div className="navbar-dropdown is-right">
                  {this.state.auth ? (
                    <div className="navbar-item">
                      <div className="field">
                        <p className="control">
                          <button
                            className="button is-info"
                            onClick={this.handleToggle}
                          >
                            Выход
                          </button>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;