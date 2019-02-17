import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Contacts from "../Contacts";

class Router extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contacts" component={Contacts} />
        {/* <Route path='/schedule' component={Schedule}/> */}
      </Switch>
    );
  }
}

export default Router;
