import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import { Contact, Contacts } from "../Contact";

class Router extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/contacts" component={Contacts} />
        <Route exact={true} path="/contacts/:contact" component={Contact} />
        {/* <Route path='/schedule' component={Schedule}/> */}
      </Switch>
    );
  }
}

export default Router;
