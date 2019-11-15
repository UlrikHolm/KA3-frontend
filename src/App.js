import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import './App.css';
import facade from "./apiFacade";
import settings from "./settings"

function App(props) {
  const { bookFactory } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(facade.loggedIn);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };

  return (
    <Router>
      <Header
        loginMsg={isLoggedIn ? facade.getTokenVal('username') : "Login"}
        isLoggedIn={isLoggedIn}
      />
      <div className="container bg-light">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/swapi">
            <Swapi />
          </Route>
          <Route path="/user">
          <User role = "user"/>
          </Route>
          <Route path="/admin">
            <User role = "admin"/>
          </Route>
          <Route path="/login">
            <LoginHandler
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
            />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Header({ isLoggedIn, loginMsg }) {
  return (
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
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" exact to="/swapi">Swapi</NavLink>
            </li>
            {isLoggedIn && (
              <React.Fragment>
                <li className="nav-item"><NavLink className="nav-link" exact to="/user">User</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" exact to="/admin">Admin</NavLink></li>
              </React.Fragment>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/login">{loginMsg}</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


function Home() {
  return (
    <div className="row">
      <div className="col-lg-12 text-center">
        <h1 className="mt-5">Cphbusiness KA3</h1>
        <p className="lead">By: Jeppe, Joshua & Ulrik</p>

      </div>
    </div>
  );
}

function Swapi() {
  const [swapiData, setSwapiData] = useState("Loading...");

  var opts = {
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json',
    }
  }

  fetch(settings.getURL("swapiUrl"))
  .then(res=> res.json())
  .then(data => setSwapiData(data))
  .catch(err => setSwapiData("Loading failed."));

  return (
    <div className="row">
      <div className="col-12">
      <h2>This is the data:</h2>
      <p>{swapiData}</p>
      </div>
    </div>
  );
}


function User({role}) {
  const [userData, setUserData] = useState("Loading...");

  var opts = facade.makeOptions("GET",true)

  fetch(settings.getURL("userUrl") + role ,opts)
  .then(res=> res.json())
  .then(data => setUserData(data.message))
  .catch(err => setUserData("Loading failed."));

  return (
    <div className="row">
      <div className="col-12">
      <h2>This is the data:</h2>
      <p>{userData}</p>
      </div>
    </div>
  );
}

function AddBook({ bookFactory }) {
  const [bookTitle, changeBookTitle] = useState("");
  const [bookInfo, changeBookInfo] = useState("");
  return (
    <div>
      <h2>Add book</h2>
      Title: <input type="text" onChange={(event) => changeBookTitle(event.target.value)} value={bookTitle} /><br />
      Info: <input type="text" onChange={(event) => changeBookInfo(event.target.value)} value={bookInfo} /><br />
      <button onClick={() => bookFactory.addBook({ title: bookTitle, info: bookInfo })}>Save</button>
      <p>{bookTitle}</p>
      <p>{bookInfo}</p>
    </div>
  );
}

function Login({ isLoggedIn, loginMsg, setLoginStatus }) {
  const BtnClick = () => {
    setLoginStatus(!isLoggedIn);
  };
  return (
    <div>
      <h2>{loginMsg}</h2>
      <button onClick={BtnClick}>{loginMsg}</button>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Siden kunne ikke findes.</h2>
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <div className="row justify-content-center">
        <h1>Login</h1>
      </div>
      <div className="row">
        <div className="col-4">
        </div>
        <div className="col-4 text-center">
          <form onChange={onChange}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" id="password" />
            </div>
            <button type="submit" className="btn btn-success" onClick={performLogin}>Login</button>
          </form>
        </div>
        <div className="col-4">
        </div>
      </div>
    </div>
  )

}
function LoggedIn() {
  // const [dataFromServer, setDataFromServer] = useState("Loading...")

  // useEffect(() => {
  //   facade.fetchData().then(data => setDataFromServer(data.msg));
  // }, [])

  return (
    <div>
      <div className="row justify-content-center">
        <h1>User page</h1>
      </div>
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col-6">
          <b>Username:</b> {facade.getTokenVal("username")}
          <br/>
          <b>Role:</b> {facade.getTokenVal("roles")}
        </div>
        <div className="col-3">
        </div>
      </div>
    </div>
  )

}

function LoginHandler({ isLoggedIn, setLoginStatus }) {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn)

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
    setLoginStatus(!isLoggedIn);
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoginStatus(!isLoggedIn))
  }

  return (
    <div>
      {!isLoggedIn ? (<LogIn login={login} />) :
        (<div className="text-center">
          <LoggedIn />
          <br/>
          <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
        </div>)}
    </div>
  )

}


export default App;
