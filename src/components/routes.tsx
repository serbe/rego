import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CertificateItem, Certificates } from '../containers/Certificate';
import { Companies, CompanyItem } from '../containers/Company';
import { ContactItem, Contacts } from '../containers/Contact';
import { DepartmentItem, Departments } from '../containers/Department';
import { EducationItem, Educations } from '../containers/Education';
import { Home } from '../containers/Home';
import { KindItem, Kinds } from '../containers/Kind';
import { Login } from '../containers/Login';
import { PostItem, Posts } from '../containers/Post';
import { PracticeItem, Practices } from '../containers/Practice';
import { RankItem, Ranks } from '../containers/Rank';
import { ScopeItem, Scopes } from '../containers/Scope';
import { SirenItem, Sirens } from '../containers/Siren';
import { SirenTypeItem, SirenTypes } from '../containers/SirenType';
import { useAuthState } from '../services/auth';

export const Router = (): JSX.Element => {
  const { auth } = useAuthState();
  const login = auth.login;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={['/', '/home']} component={login ? Home : Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/certificates" component={login ? Certificates : Login} />
        <Route exact path="/certificates/:id" component={login ? CertificateItem : Login} />
        <Route exact path="/companies" component={login ? Companies : Login} />
        <Route exact path="/companies/:id" component={login ? CompanyItem : Login} />
        <Route exact path="/contacts" component={login ? Contacts : Login} />
        <Route exact path="/contacts/:id" component={login ? ContactItem : Login} />
        <Route exact path="/departments" component={login ? Departments : Login} />
        <Route exact path="/departments/:id" component={login ? DepartmentItem : Login} />
        <Route exact path="/educations" component={login ? Educations : Login} />
        <Route exact path="/educations/:id" component={login ? EducationItem : Login} />
        <Route exact path="/kinds" component={login ? Kinds : Login} />
        <Route exact path="/kinds/:id" component={login ? KindItem : Login} />
        <Route exact path="/posts" component={login ? Posts : Login} />
        <Route exact path="/posts/:id" component={login ? PostItem : Login} />
        <Route exact path="/practices" component={login ? Practices : Login} />
        <Route exact path="/practices/:id" component={login ? PracticeItem : Login} />
        <Route exact path="/ranks" component={login ? Ranks : Login} />
        <Route exact path="/ranks/:id" component={login ? RankItem : Login} />
        <Route exact path="/scopes" component={login ? Scopes : Login} />
        <Route exact path="/scopes/:id" component={login ? ScopeItem : Login} />
        <Route exact path="/sirens" component={login ? Sirens : Login} />
        <Route exact path="/sirens/:id" component={login ? SirenItem : Login} />
        <Route exact path="/sirentypes" component={login ? SirenTypes : Login} />
        <Route exact path="/sirentypes/:id" component={login ? SirenTypeItem : Login} />
      </Switch>
    </Suspense>
  );
};
