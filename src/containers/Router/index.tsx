import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CertificateItem, Certificates } from '../Certificate';
import { Companies, CompanyItem } from '../Company';
import { ContactItem, Contacts } from '../Contact';
import { Home } from '../Home';

export const Router = (): JSX.Element => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/certificates" component={Certificates} />
      <Route exact path="/certificates/:id" component={CertificateItem} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/contacts/:id" component={ContactItem} />
      <Route exact path="/companies" component={Companies} />
      <Route exact path="/companies/:id" component={CompanyItem} />
    </Switch>
  </Suspense>
);
