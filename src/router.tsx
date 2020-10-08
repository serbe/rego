import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from './containers/Home';
import { Login } from './containers/Login';
import { useAuthState } from './helpers/auth';

// import { CertificateItem, Certificates } from '../containers/Certificate';
// import { Companies, CompanyItem } from '../containers/Company';
// import { ContactItem, Contacts } from '../containers/Contact';
// import { DepartmentItem, Departments } from '../containers/Department';
// import { EducationItem, Educations } from '../containers/Education';
// import { KindItem, Kinds } from '../containers/Kind';
// import { PostItem, Posts } from '../containers/Post';
// import { PracticeItem, Practices } from '../containers/Practice';
// import { RankItem, Ranks } from '../containers/Rank';
// import { ScopeItem, Scopes } from '../containers/Scope';
// import { SirenItem, Sirens } from '../containers/Siren';
// import { SirenTypeItem, SirenTypes } from '../containers/SirenType';

interface LocationState {
  from: {
    pathname: string;
  };
}

interface RouteProperties {
  children: ReactElement;
  path: string;
  logged: boolean;
  exact?: boolean;
}

// { children: ReactElement, ...rest }

const PrivateRoute = (properties: RouteProperties): JSX.Element => {
  const { children, path, logged } = properties;
  return (
    <Route
      path={path}
      render={({ location }) =>
        logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const Router = (): JSX.Element => {
  // const { ws } = useWebSocketState();
  const { auth } = useAuthState();
  return (
    <div className="container py-4 centered-content">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/" logged={auth.login}>
          <Home />
        </PrivateRoute>
        {/* <Route exact path="/certificates" component={Certificates} />
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
      <Route exact path="/sirentypes/:id" component={SirenTypeItem} /> */}
      </Switch>
    </div>
  );
};
