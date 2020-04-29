import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './button';

const NavbarNotLogged = (): JSX.Element => (
  <div className="navbar-brand">
    <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
      Авторизация
    </NavLink>
  </div>
);

const NavbarDropdown = (): JSX.Element => (
  <div className="navbar-dropdown">
    <NavLink activeClassName="is-active" className="navbar-item" to="/departments">
      Отделы
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/educations">
      Обучение
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/kinds">
      Типы
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/posts">
      Должности
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/practices">
      Учения
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/ranks">
      Чины
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/scopes">
      Сферы
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/certificates">
      Удостоверения
    </NavLink>
    <hr className="navbar-divider" />
    <NavLink activeClassName="is-active" className="navbar-item" to="/sirentypes">
      Типы сирен
    </NavLink>
  </div>
);

const DropdownItem = (): JSX.Element => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a href="#directory" className="navbar-link">
      Справочники
    </a>
    <NavbarDropdown />
  </div>
);

const NavbarEnd = (): JSX.Element => (
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
);

const NavbarStart = (): JSX.Element => (
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
    <DropdownItem />
  </div>
);

export const NavBar = (): JSX.Element => {
  // const [auth, setAuth] = useState(true);
  // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);
  const auth = true;
  const [open, setOpen] = useState(false);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  return (
    <nav aria-label="main navigation" className="navbar is-dark" role="navigation">
      <div className="container">
        {auth ? (
          <>
            <div className="navbar-brand">
              <NavLink activeClassName="is-active" className="navbar-item" exact={true} to="/">
                ЕДДС
              </NavLink>
              <a
                aria-expanded="false"
                aria-label="menu"
                className={open ? 'navbar-burger is-active' : 'navbar-burger'}
                data-target="navbarData"
                role="button"
                href="#button"
                onClick={handleToggle}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
            <div id="navbarData" className={open ? 'navbar-menu is-active' : 'navbar-menu'}>
              <NavbarStart />
              <NavbarEnd />
            </div>
          </>
        ) : (
          <NavbarNotLogged />
        )}
      </div>
    </nav>
  );
};
