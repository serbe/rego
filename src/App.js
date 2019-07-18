import React from "react";
import Router from "./containers/Router";
import NavBar from "./components/navbar";

export class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router />
        <footer className="footer">
          <div className="container has-text-centered">
            <p>© 2019 Сочи</p>
          </div>
        </footer>
      </div>
    );
  }
}
