import React, { FC, useState } from 'react';
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
  // const [auth, setAuth] = useState(true);
  const auth = true;
  const [open, setOpen] = useState(false);

  const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);

  const handleToggle = (): void => {
    setOpen(!open);
  };

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
                onClick={handleToggle}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div id="navbarData" className={openClassName('navbar-menu')}>
              <div className="navbar-start">
                <NavLink
                  activeClassName="is-active"
                  className="navbar-item"
                  to="/contacts"
                  onClick={handleToggle}
                >
                  Контакты
                </NavLink>
                <NavLink
                  activeClassName="is-active"
                  className="navbar-item"
                  to="/companies"
                  onClick={handleToggle}
                >
                  Организации
                </NavLink>
                <NavLink
                  activeClassName="is-active"
                  className="navbar-item"
                  to="/sirens"
                  onClick={handleToggle}
                >
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
                      onClick={handleToggle}
                      to="/departments"
                    >
                      Отделы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/educations"
                    >
                      Обучение
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/kinds"
                    >
                      Типы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/posts"
                    >
                      Должности
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/practices"
                    >
                      Учения
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/ranks"
                    >
                      Чины
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/scopes"
                    >
                      Сферы
                    </NavLink>
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/certificates"
                    >
                      Удостоверения
                    </NavLink>
                    <hr className="navbar-divider" />
                    <NavLink
                      activeClassName="is-active"
                      className="navbar-item"
                      onClick={handleToggle}
                      to="/sirentypes"
                    >
                      Типы сирен
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item has-dropdown is-hoverable">
                  <a href="#user" className="navbar-link" onClick={handleToggle}>
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
