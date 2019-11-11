import Home from "../Home";
import React, { Suspense, FC } from "react";
import { ContactItem, Contacts } from "../Contact";
import { CompanyItem, Companies } from "../Company";
import { Certificates } from "../Certificate";
import { Switch, Route } from "react-router-dom";

export const Router: FC<{}> = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/contacts" component={Contacts} />
      <Route exact={true} path="/contacts/:id" component={ContactItem} />
      <Route exact={true} path="/companies" component={Companies} />
      <Route exact={true} path="/companies/:id" component={CompanyItem} />
      <Route exact={true} path="/certificates" component={Certificates} />
    </Switch>
  </Suspense>
);
