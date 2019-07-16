/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { Button, Icon, Menu } from "antd";

const { SubMenu } = Menu;

// function toggleOpen() {
//   return (previousState, currentProps) => {
//     return { ...previousState, open: !previousState.open };
//   };
// }

class NavBar extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      auth: true,
      logged: true,
      open: false
    };
  }

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  // onClick = () => {
  //   this.setState(toggleOpen());
  // };

  // handleClose = () => this.setState({open: false});

  // handleLink = (e, uri) => {
  //   // e.preventDefault();
  //   this.context.router.history.push(uri);
  // }

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="home">

          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            exact={true}
            to="/"
          >
            <Icon type="home" />
            ЕДДС
          </NavLink>
        </Menu.Item>
        <Menu.Item key="contacts">
          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            to="/contacts"
          >
            <Icon type="contacts" />
            Контакты
          </NavLink>
        </Menu.Item>
        <Menu.Item key="companies">
          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            to="/companies"
          >
            <Icon type="bank" />
            Организации
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sirens">
          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            to="/sirens"
          >
            <Icon type="wifi" />
            Сирены
          </NavLink>
        </Menu.Item>
        <SubMenu
          title={<span className="submenu-title-wrapper"><Icon type="database" />Справочники</span>}
        >
          <Menu.Item key="departments">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/departments"
            >
              Отделы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="educations">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/educations"
            >
              Обучение
            </NavLink>
          </Menu.Item>
          <Menu.Item key="kinds">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/kinds"
            >
              Типы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="posts">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/posts"
            >
              Должности
            </NavLink>
          </Menu.Item>
          <Menu.Item key="practices">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/practices"
            >
              Учения
            </NavLink>
          </Menu.Item>
          <Menu.Item key="ranks">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/ranks"
            >
              Чины
            </NavLink>
          </Menu.Item>
          <Menu.Item key="scopes">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/scopes"
            >
              Сферы
            </NavLink>
          </Menu.Item>
          <Menu.Item key="certificates">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/certificates"
            >
              Удостоверения
            </NavLink>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="sirentypes">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.handleToggle}
              to="/sirentypes"
            >
              Типы сирен
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          title={<span className="submenu-title-wrapper">Пользователь</span>}
        >
          <Menu.Item key="name">
            <Icon type="user" />
            name
          </Menu.Item>
          <Menu.Item key="exit">
            <Button color="link">Выход</Button>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default NavBar;
