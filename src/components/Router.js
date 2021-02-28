import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import Profile from "../routes/Profile";

function CRouter({ isLoggedIn }) {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      {isLoggedIn ? (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route exact path="/" component={Auth} />
        </Switch>
      )}
    </Router>
  );
}

export default CRouter;
