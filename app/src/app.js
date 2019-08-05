import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';

const App = () => (
  <HashRouter basename="/">
    <Switch>
      <Route
        exact
        path="/login"
        component={Login}
      />
      <Route
        exact
        path="/register"
        component={Register}
      />
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        render={() => <Redirect to="/" />}
      />
    </Switch>
  </HashRouter>
);


export default App;
