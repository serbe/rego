import React from "react";
import Router from "./containers/Router";
import { Layout } from "antd";
import NavBar from "./components/navbar";

import 'antd/dist/antd.css';
import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <Layout style={{maxWidth: 1024, marginLeft: 'auto', marginRight: 'auto'}}>
        <NavBar />
        <Layout style={{marginTop: 20, marginBottom: 20}}>
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
