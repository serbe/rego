import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

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

export const NavBar: FC<{}> = () => {
  // const [auth, setAuth] = useState(true);
  const auth = true;
  const [open, setOpen] = useState(false);

  const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  return (
    <Container>
      {auth ? (
        <Menu>
          <Menu.Item name="ЕДДС" as={NavLink} exact to="/" />
          <Menu.Item name="Контакты" as={NavLink} to="/contacts" onClick={handleToggle} />
          <Menu.Item name="Организации" as={NavLink} to="/companies" onClick={handleToggle} />
          <Menu.Item name="Сирены" as={NavLink} to="/sirens" onClick={handleToggle} />

          <Menu.Item>
            <Dropdown text="Справочники">
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleToggle} to="/departments">
                  Отделы
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/educations"
                >
                  Обучение
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/kinds"
                >
                  Типы
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/posts"
                >
                  Должности
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/practices"
                >
                  Учения
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/ranks"
                >
                  Чины
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/scopes"
                >
                  Сферы
                </Dropdown.Item>
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/certificates"
                >
                  Удостоверения
                </Dropdown.Item>
                <hr className="navbar-divider" />
                <Dropdown.Item
                  activeClassName="is-active"
                  className="navbar-item"
                  onClick={handleToggle}
                  to="/sirentypes"
                >
                  Типы сирен
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown text="name">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button>Выход</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      ) : (
        <div className="navbar-brand">
          <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
            Авторизация
          </NavLink>
        </div>
      )}
    </Container>
  );
};
