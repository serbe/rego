import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../helpers/auth';
import { Button } from './button';

interface Setter {
  setter: (value: boolean) => void;
}

interface OpenState {
  open: boolean;
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
  { link: '/kinds', name: 'Типы тренировок' },
  { link: '/posts', name: 'Должности' },
  { link: '/practices', name: 'Учения' },
  { link: '/ranks', name: 'Чины' },
  { link: '/scopes', name: 'Сферы' },
  { link: '/certificates', name: 'Удостоверения' },
  { link: '/sirentypes', name: 'Типы сирен' },
];

const NavbarNotLogged = (): JSX.Element => (
  <nav className="navbar is-dark" role="navigation">
    <div className="navbar-brand">
      <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
        Авторизация
      </NavLink>
    </div>
  </nav>
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

const NavbarEnd = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const { name } = state;
  return (
    <div className="navbar-end" key="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a href="#user" className="navbar-link">
          {name}
        </a>
        <div className="navbar-dropdown is-right">
          <div className="navbar-item">
            <Button className="is-link">Выход</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandBar = (properties: OpenState): JSX.Element => {
  const { open, setter } = properties;
  return (
    <>
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
        onClick={() => setter(!open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </>
  );
};

export const NavBar = (): JSX.Element => {
  // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);
  const { state } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return state.role > 0 ? (
    <nav className="navbar is-dark" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-brand">
        <BrandBar open={open} setter={setOpen} />
      </div>
      <div id="navbarData" className={open ? 'navbar-menu is-active' : 'navbar-menu'}>
        <NavBarStart setter={setOpen} />
        <NavbarEnd />
      </div>
    </nav>
  ) : (
    <NavbarNotLogged />
  );
};
