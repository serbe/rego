import Home from "../Home";
import React, { Suspense } from "react";
import { Contact, Contacts } from "../Contact";
import { Company, Companies } from "../Company";
import { Certificates } from "../Certificate";
import { Switch, Route } from "react-router-dom";

class Router extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/contacts" component={Contacts} />
          <Route exact={true} path="/contacts/:contact" render={routeProps => <Contact {...routeProps}/>} />
          <Route exact={true} path="/companies" component={Companies} />
          <Route exact={true} path="/companies/:company" component={Company} />
          <Route exact={true} path="/certificates" component={Certificates} />
        </Switch>
      </Suspense>
    );
  }
}

export default Router;
