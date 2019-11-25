import React, { Suspense, FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../Home';
import { CertificateItem, Certificates } from '../Certificate';
import { ContactItem, Contacts } from '../Contact';
import { CompanyItem, Companies } from '../Company';

export const Router: FC<{}> = () => (
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
