import React from 'react';
import { Router } from './containers/Router';
import { Layout } from 'antd';
import { NavBar } from './components/navbar';
import './rugo.css';

const { Header, Footer, Sider, Content } = Layout;

const Rugo = (): JSX.Element => {
  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <NavBar />
          <Router />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Rugo;
