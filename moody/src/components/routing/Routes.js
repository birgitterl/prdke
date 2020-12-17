import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import ProfileForm from '../profile/ProfileForm';
import Profile from '../profile/Profile';
import NotFound from '../layout/NotFound';
import Homesite from '../home/Homesite';
import SearchResult from '../search/SearchResult';

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/homesite" component={Homesite} />
        <Route exact path="/profileform" component={ProfileForm} />
        <Route exact path="/profile/me" component={Profile} />
        <Route exact path="/searchresult" component={SearchResult} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
