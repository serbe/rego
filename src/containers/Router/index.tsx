import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CertificateItem, Certificates } from '../Certificate';
import { Companies, CompanyItem } from '../Company';
import { ContactItem, Contacts } from '../Contact';
import { DepartmentItem, Departments } from '../Department';
import { EducationItem, Educations } from '../Education';
import { Home } from '../Home';
import { KindItem, Kinds } from '../Kind';
import { PostItem, Posts } from '../Post';
import { PracticeItem, Practices } from '../Practice';
import { RankItem, Ranks } from '../Rank';
import { ScopeItem, Scopes } from '../Scope';
import { SirenItem, Sirens } from '../Siren';
import { SirenTypeItem, SirenTypes } from '../SirenType';

export const Router = (): JSX.Element => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/certificates" component={Certificates} />
      <Route exact path="/certificates/:id" component={CertificateItem} />
      <Route exact path="/companies" component={Companies} />
      <Route exact path="/companies/:id" component={CompanyItem} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/contacts/:id" component={ContactItem} />
      <Route exact path="/departments" component={Departments} />
      <Route exact path="/departments/:id" component={DepartmentItem} />
      <Route exact path="/educations" component={Educations} />
      <Route exact path="/educations/:id" component={EducationItem} />
      <Route exact path="/kinds" component={Kinds} />
      <Route exact path="/kinds/:id" component={KindItem} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/posts/:id" component={PostItem} />
      <Route exact path="/practices" component={Practices} />
      <Route exact path="/practices/:id" component={PracticeItem} />
      <Route exact path="/ranks" component={Ranks} />
      <Route exact path="/ranks/:id" component={RankItem} />
      <Route exact path="/scopes" component={Scopes} />
      <Route exact path="/scopes/:id" component={ScopeItem} />
      <Route exact path="/sirens" component={Sirens} />
      <Route exact path="/sirens/:id" component={SirenItem} />
      <Route exact path="/sirentypes" component={SirenTypes} />
      <Route exact path="/sirentypes/:id" component={SirenTypeItem} />
    </Switch>
  </Suspense>
);
