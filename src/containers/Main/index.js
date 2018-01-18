import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from 'containers/Home'
import Contacts from 'containers/Contacts'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contacts' component={Contacts}/>
      {/* <Route path='/schedule' component={Schedule}/> */}
    </Switch>
  </main>
)

export default Main