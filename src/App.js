import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Login";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Login from "./Login";
import Swapi from "./Swapi";
import Home from "./Home";
import UserPage from "./UserPage";

function App() {
  return (
    <Router>
    <div className="App">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark static-top"
        id="nav"
      >
        <div className="container">
          <a className="navbar-brand text-white">
            JJU Group
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/swapi">
                  Swapi
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  Admin
                </a>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" exact to="/user">
                  User
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/UlrikHolm/KA3-backend">
                  Github Repo
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <NavLink className="nav-link" exact to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container bg-light">
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/swapi">
            <Swapi />
          </Route>
          <Route path="/user">
            <UserPage/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
