import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../login/Login";
import Home from "../home/Home";
import "./Main.css";
import Register from "../register/Register";

const Main = ({ isLoggedIn, handleLoggedIn }) => {
  const showLogin = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLoggedIn={handleLoggedIn} />
    );
  };

  const showHome = () => {
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  return (
    <div className="main">
      <Switch>
        <Route exact path="/" render={showLogin} />
        <Route path="/login" render={showLogin} />
        <Route path="/register" component={Register} />
        <Route path="/home" render={showHome} />
      </Switch>
    </div>
  );
};

export default Main;
