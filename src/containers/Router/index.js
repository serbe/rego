import Home from "../Home";
import React from "react";
import { Contact, Contacts } from "../Contact";
import { Switch, Route } from "react-router-dom";

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/contacts" component={Contacts} />
        <Route exact={true} path="/contacts/:contact" component={Contact} />
      </Switch>
    );
  }
}

export default Router;
