import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './button';

interface Setter {
  setter: (value: boolean) => void;
}

const mainItems = [
  { link: '/contacts', name: 'Контакты' },
  { link: '/companies', name: 'Организации' },
  { link: '/sirens', name: 'Сирены' },
];

const dropdownItems = [
  { link: '/departments', name: 'Отделы' },
  { link: '/educations', name: 'Обучение' },
  { link: '/kinds', name: 'Типы' },
  { link: '/posts', name: 'Должности' },
  { link: '/practices', name: 'Учения' },
  { link: '/ranks', name: 'Чины' },
  { link: '/scopes', name: 'Сферы' },
  { link: '/certificates', name: 'Удостоверения' },
  { link: '/sirentypes', name: 'Типы сирен' },
];

const NavbarNotLogged: JSX.Element = (
  <div className="navbar-brand">
    <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
      Авторизация
    </NavLink>
  </div>
);

const MainItems = (value: Setter): JSX.Element => (
  <>
    {mainItems.map((item, index) => (
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to={item.link}
        key={`main-items-${index}`}
        onClick={() => value.setter(false)}
      >
        {item.name}
      </NavLink>
    ))}
  </>
);

const NavbarDropdown = (value: Setter): JSX.Element => (
  <div className="navbar-dropdown" key="navbar-dropdown">
    {dropdownItems.map((item, index) => (
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        to={item.link}
        key={`navbar-dropdown-${index}`}
        onClick={() => value.setter(false)}
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);

const NavBarStart = (value: Setter): JSX.Element => (
  <div className="navbar-start" key="navbar-start">
    <MainItems setter={value.setter} />
    <div className="navbar-item has-dropdown is-hoverable" key="dropdown-items">
      <a href="#directory" className="navbar-link">
        Справочники
      </a>
      <NavbarDropdown setter={value.setter} />
    </div>
  </div>
);

const NavbarEnd: JSX.Element = (
  <div className="navbar-end" key="navbar-end">
    <div className="navbar-item has-dropdown is-hoverable">
      <a href="#user" className="navbar-link">
        name
      </a>
      <div className="navbar-dropdown is-right">
        <div className="navbar-item">
          <Button className="is-link">Выход</Button>
        </div>
      </div>
    </div>
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
              <NavBarStart setter={setOpen} />
              {NavbarEnd}
            </div>
          </>
        ) : (
          NavbarNotLogged
        )}
      </div>
    </nav>
  );
};
