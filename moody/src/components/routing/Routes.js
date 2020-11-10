import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Hometimeline from "../hometimeline/Hometimeline";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import NotFound from "../layout/NotFound";

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/hometimeline" component={Hometimeline} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
