import Home from "../Home";
import React, { Suspense } from "react";
import { Contact, Contacts } from "../Contact";
import { Switch, Route } from "react-router-dom";

class Router extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/contacts" component={Contacts} />
          <Route exact={true} path="/contacts/:contact" component={Contact} />
        </Switch>
      </Suspense>
    );
  }
}

export default Router;
