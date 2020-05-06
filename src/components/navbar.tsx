import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'antd';

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

// const NavbarNotLogged = (): JSX.Element => (
//   <div className="navbar-brand">
//     <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
//       Авторизация
//     </NavLink>
//   </div>
// );

const DropdownMenu = (): JSX.Element => (
  <div>
    <SubMenu key="sub1" icon={<MailOutlined />} title="Справочники">
      <Menu.Item key="6">
        <NavLink activeClassName="is-active" className="navbar-item" to="/departments">
          Отделы
        </NavLink>
      </Menu.Item>
      <Menu.Item key="7">
        <NavLink activeClassName="is-active" className="navbar-item" to="/educations">
          Обучение
        </NavLink>
      </Menu.Item>
      <Menu.Item key="8">
        <NavLink activeClassName="is-active" className="navbar-item" to="/kinds">
          Типы
        </NavLink>
      </Menu.Item>
      <Menu.Item key="9">
        <NavLink activeClassName="is-active" className="navbar-item" to="/posts">
          Должности
        </NavLink>
      </Menu.Item>
      <Menu.Item key="10">
        <NavLink activeClassName="is-active" className="navbar-item" to="/practices">
          Учения
        </NavLink>
      </Menu.Item>
      <Menu.Item key="11">
        <NavLink activeClassName="is-active" className="navbar-item" to="/ranks">
          Чины
        </NavLink>
      </Menu.Item>
      <Menu.Item key="12">
        <NavLink activeClassName="is-active" className="navbar-item" to="/scopes">
          Сферы
        </NavLink>
      </Menu.Item>
      <Menu.Item key="13">
        <NavLink activeClassName="is-active" className="navbar-item" to="/certificates">
          Удостоверения
        </NavLink>
      </Menu.Item>
      <Menu.Item key="14">
        <NavLink activeClassName="is-active" className="navbar-item" to="/sirentypes">
          Типы сирен
        </NavLink>
      </Menu.Item>
    </SubMenu>
  </div>
);

// const NavbarEnd = (): JSX.Element => (
//   <div className="navbar-end">
//     <div className="navbar-item has-dropdown is-hoverable">
//       <a href="#user" className="navbar-link">
//         name
//       </a>
//       <div className="navbar-dropdown is-right">
//         <div className="navbar-item">
//           <Button color="link">Выход</Button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

const MainMenu = (): JSX.Element => (
  <div>
    <Menu.Item key="1" icon={<PieChartOutlined />}>
      <NavLink activeClassName="is-active" className="navbar-item" to="/">
        ЕДДС
      </NavLink>
    </Menu.Item>
    <Menu.Item key="2" icon={<PieChartOutlined />}>
      <NavLink activeClassName="is-active" className="navbar-item" to="/contacts">
        Контакты
      </NavLink>
    </Menu.Item>
    <Menu.Item key="3" icon={<DesktopOutlined />}>
      <NavLink activeClassName="is-active" className="navbar-item" to="/companies">
        Организации
      </NavLink>
    </Menu.Item>
    <Menu.Item key="4" icon={<ContainerOutlined />}>
      <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
        Сирены
      </NavLink>
    </Menu.Item>
  </div>
);

export const NavBar = (): JSX.Element => {
  // const [auth, setAuth] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <NavLink activeClassName="is-active" className="navbar-item" to="/">
            ЕДДС
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <NavLink activeClassName="is-active" className="navbar-item" to="/contacts">
            Контакты
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <NavLink activeClassName="is-active" className="navbar-item" to="/companies">
            Организации
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<ContainerOutlined />}>
          <NavLink activeClassName="is-active" className="navbar-item" to="/sirens">
            Сирены
          </NavLink>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Справочники">
          <Menu.Item key="6">
            <NavLink activeClassName="is-active" className="navbar-item" to="/departments">
              Отделы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink activeClassName="is-active" className="navbar-item" to="/educations">
              Обучение
            </NavLink>
          </Menu.Item>
          <Menu.Item key="8">
            <NavLink activeClassName="is-active" className="navbar-item" to="/kinds">
              Типы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink activeClassName="is-active" className="navbar-item" to="/posts">
              Должности
            </NavLink>
          </Menu.Item>
          <Menu.Item key="10">
            <NavLink activeClassName="is-active" className="navbar-item" to="/practices">
              Учения
            </NavLink>
          </Menu.Item>
          <Menu.Item key="11">
            <NavLink activeClassName="is-active" className="navbar-item" to="/ranks">
              Чины
            </NavLink>
          </Menu.Item>
          <Menu.Item key="12">
            <NavLink activeClassName="is-active" className="navbar-item" to="/scopes">
              Сферы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="13">
            <NavLink activeClassName="is-active" className="navbar-item" to="/certificates">
              Удостоверения
            </NavLink>
          </Menu.Item>
          <Menu.Item key="14">
            <NavLink activeClassName="is-active" className="navbar-item" to="/sirentypes">
              Типы сирен
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};
