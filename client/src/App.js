import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from '../src/components/Login/Login'
import Register from '../src/components/Login/Register'
import Dashboard from '../src/components/Login/protected/Dashboard'
import { logout } from '../src/components/helpers/auth'
import { firebaseAuth } from '../src/components/config/constants'
import '../src/components/Login/Login.css'
import API from "./utils/API";

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
    loadCryptos: []
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

    API.loadCryptos () 
      .then(res => this.setState({loadCryptos: res.data}));
    
  }
  componentWillUnmount () {
    this.removeListener()
  }

  callChart = (coinName) => {
    console.log("coinName")


    new window.TradingView.widget({
      "width": 980,
      "height": 610,
      "symbol": "Bitstamp:" + coinName + "usd",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "hideideas": true
    })
    var a = document.createElement('a');
      var linkText = document.createTextNode("my title text");
      a.appendChild(linkText);
      a.title = "Go Back";
      a.href = "/";
      document.body.appendChild(a);
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
            {this.state.loadCryptos.map(coin => (
              <div className="row" key={coin.name}>
              <div className="col m4 coinName" onClick={() => this.callChart(coin.abv)}>{coin.name}
              </div>
              <div className="col m4">{coin.price}</div>
              <div className="col m4">{coin.percent}</div>
              </div>
            ))}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
