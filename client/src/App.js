import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from '../src/components/Login/Login'
import Register from '../src/components/Login/Register'
import Dashboard from '../src/components/Login/protected/Dashboard'
import { logout } from '../src/components/helpers/auth'
import { firebaseAuth } from '../src/components/config/constants'
import '../src/components/Login/Login.css'




function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div >
            <div className="container-fluid">
            <div className="navbar-header">
              </div>
              <ul className="nav navbar-nav">
                <li
                className={window.location.pathname === "/" ? "active" : ""} 
                >
                {this.state.authed
                    ? <span>
                <Link to="/" className="nav-link">Home</Link>
                      </span>
                    : <span>
                      </span>}
                </li>
                <li
                      className={window.location.pathname === "/dashboard" ? "active" : "" }                >

                {this.state.authed
                    ? <span>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </span>
                    : <span>
                      </span>}
                </li>

                <li
                >
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="nav-link glyphicon glyphicon-log-out">Logout</button>
                    : <ul className="nav navbar-nav">
                        <li>
                        <Link to="/login" className="nav-link"> Login</Link>
                        </li>
                        <li>
                        <Link to="/register" className="nav-link"> Register</Link>
                        </li>
                      </ul>}
                </li>
              </ul>
              
            </div>
          <div className="container-fluid">
            <div className="row">
              <Switch>
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./pages/Home";
// import User from './pages/Dashboard'

// const App = () =>
//   <Router>
//     <div>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/dashboard" component={User} />
//       </Switch>
//     </div>
//   </Router>;

// export default App;

