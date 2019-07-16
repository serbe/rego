import React from "react";
import Router from "./containers/Router";
import { Layout } from "antd";
import NavBar from "./components/navbar";

import 'antd/dist/antd.css';
import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <Layout style={{maxWidth: 960, marginLeft: 'auto', marginRight: 'auto'}}>
        <NavBar />
        <Layout>
          <Router />
        </Layout>
        <footer className="footer">
          <div className="container has-text-centered">
            <p>© 2019 Сочи</p>
          </div>
        </footer>
      </Layout>
    );
  }
}
