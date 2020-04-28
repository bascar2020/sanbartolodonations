import React from 'react';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
