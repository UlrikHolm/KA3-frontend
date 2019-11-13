import React, { useState, useEffect } from 'react';
import facade from "./apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function LoginForm({ login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
   
    const performLogin = (evt) => {
      evt.preventDefault();
      login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
      setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
    }
   
    return (
        <div>
            <div className="row justify-content-center">
                <h1>Hello from Login</h1>
            </div>
            <div className="row">
                <div className="col-4">
                </div>
                <div className="col-4">
                    <form onChange={onChange}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" placeholder="Enter username" id="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" placeholder="Password" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={performLogin}>Login</button>
                    </form>
                </div>
                <div className="col-4">
                </div>
            </div>
        </div>
    )
   
  }

  function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")
    
    useEffect(() => {
     facade.fetchData().then(data=> setDataFromServer(data.msg));
    }, [])
   
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{dataFromServer}</h3>
      </div>
    )
   
  }

function Login() {

    const [loggedIn, setLoggedIn] = useState(facade.loggedIn)
 
    const logout = () => {
      facade.logout()
     setLoggedIn(false)
    }
    const login = (user, pass) => {
      facade.login(user,pass)
   .then(res =>setLoggedIn(true));
  
    } 
   
    return (
      <div>
        {!loggedIn ? (<LoginForm login={login} />) :
          (<div>
            <LoggedIn />
            <button onClick={logout}>Logout</button>
          </div>)}
      </div>
    )
   

}


export default Login;