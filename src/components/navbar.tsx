import React, { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { NavLink } from 'react-router-dom';
import { Button } from './button';

const NavbarNotLogged = (): JSX.Element => (
  <div className="navbar-brand">
    <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
      Авторизация
    </NavLink>
  </div>
);

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

const MainItems = (): JSX.Element => (
  <>
    {mainItems.map((item) => (
      <NavLink activeClassName="is-active" className="navbar-item" to={item.link} key={uuidv1()}>
        {item.name}
      </NavLink>
    ))}
  </>
);

const NavbarDropdown = (): JSX.Element => (
  <div className="navbar-dropdown" key={uuidv1()}>
    {dropdownItems.map((item) => (
      <NavLink activeClassName="is-active" className="navbar-item" to={item.link} key={uuidv1()}>
        {item.name}
      </NavLink>
    ))}
  </div>
);

const DropdownItems = (): JSX.Element => (
  <div className="navbar-item has-dropdown is-hoverable" key={uuidv1()}>
    <a href="#directory" className="navbar-link">
      Справочники
    </a>
    <NavbarDropdown />
  </div>
);

const NavbarEnd = (): JSX.Element => (
  <div className="navbar-end" key={uuidv1()}>
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

const NavbarStart = (): JSX.Element => (
  <div className="navbar-start" key={uuidv1()}>
    <MainItems />
    <DropdownItems />
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
