import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './button';

const NavbarNotLogged = (): JSX.Element => (
  <div className="navbar-brand">
    <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
      Авторизация
    </NavLink>
  </div>
);

const NavbarBrand = (): JSX.Element => (
  <div className="navbar-brand">
    <NavLink activeClassName="is-active" className="navbar-item" exact={true} to="/">
      ЕДДС
    </NavLink>

    <a
      aria-expanded="false"
      aria-label="menu"
      className="navbar-burger burger"
      data-target="navbarData"
      role="button"
      href="#button"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
);

const NavbarDropdown = (
  handleToggle: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined,
): JSX.Element => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a href="#directory" className="navbar-link">
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
);

const NavbarEnd = (): JSX.Element => (
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
);

const NavbarStart = (): JSX.Element => (
  <>
    <NavLink activeClassName="is-active" className="navbar-item" to="/contacts">
      Контакты
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/companies">
      Организации
    </NavLink>
    <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
      Сирены
    </NavLink>
  </>
);

export const NavBar: FC<{}> = () => {
  // const [auth, setAuth] = useState(true);
  const auth = true;
  const [open, setOpen] = useState(false);

  // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <nav aria-label="main navigation" className="navbar is-dark" role="navigation">
        <div className="container">
          {auth ? (
            <>
              <NavbarBrand />
              <div id="navbarData" className="navbar-menu">
                <div className="navbar-start">
                  <NavbarStart />
                  {NavbarDropdown(handleToggle)}
                </div>
              </div>
              <div className="navbar-end">
                <NavbarEnd />
              </div>
            </>
          ) : (
            NavbarNotLogged
          )}
        </div>
      </nav>
    </>
  );
};
