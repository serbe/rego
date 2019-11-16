import React, { FC } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { Button } from './button';

// function toggleOpen() {
//   return (previousState, currentProps) => {
//     return { ...previousState, active: !previousState.active };
//   };
// }

// interface NavBarState {
//   active: boolean,
//       auth: boolean,
//       logged: boolean,
//       open: boolean
// }

const navMenuStyle = (): string => {
  return clsx(['navbar-item', 'has-dropdown', 'is-hoverable']);
};

export const NavBar: FC<{}> = () => {
  const auth = true;
  // const [active, setActive] = useState(false);
  // const [auth, setAuth] = useState(true);
  // const [logged, setLogged] = useState(true);
  // const [open, setOpen] = useState(false);
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  // constructor(p: {}) {
  //   super(p);
  //   this.state = {
  //     active: false,
  //     auth: true,
  //     logged: true,
  //     open: false
  //   };
  // }

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  // handleToggle = () => {
  //   this.setState(toggleOpen());
  // };

  // handleClose = () => this.setState({open: false});

  // handleLink = (e, uri) => {
  //   // e.preventDefault();
  //   this.context.router.history.push(uri);
  // }

  return (
    <nav aria-label="main navigation" className="navbar is-dark" role="navigation">
      <div className="container">
        {auth ? (
          <>
            <div className="navbar-brand">
              <NavLink activeClassName="is-active" className="navbar-item" exact to="/">
                ЕДДС
              </NavLink>

              <a
                href="#menu"
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
                <NavLink activeClassName="is-active" className="navbar-item" to="/contacts">
                  Контакты
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item" to="/companies">
                  Организации
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
                  Сирены
                </NavLink>

                <div className={navMenuStyle()}>
                  <a href="#dirs" className="navbar-link">
                    Справочники
                  </a>
                  <div className="navbar-dropdown">
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/departments"
                    >
                      Отделы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/educations"
                    >
                      Обучение
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/kinds"
                    >
                      Типы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/posts"
                    >
                      Должности
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/practices"
                    >
                      Учения
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/ranks"
                    >
                      Чины
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/scopes"
                    >
                      Сферы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/certificates"
                    >
                      Удостоверения
                    </NavLink>
                    <hr className="navbar-divider" />
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      // onClick={this.handleToggle}
                      to="/sirentypes"
                    >
                      Типы сирен
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item has-dropdown is-hoverable">
                  <a href="#user" className="navbar-link">
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
          </>
        ) : (
          <div className="navbar-brand">
            <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
              Авторизация
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
