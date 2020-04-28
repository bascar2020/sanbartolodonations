import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg';
import './Login.css';
import {auth} from "../../services/fire"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading : false
    }
}
  
handleClick = () => {
    let that = this;
    this.setState({isLoading:true});
    auth.signInAnonymously()
    auth.onAuthStateChanged(function(user) {
      if (user) {
       // console.log(user)
        that.setState({isLoading:false});
        that.props.history.push('/home');
        
      } else {
        that.setState({isLoading:false});
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <p>
          Register donations for people affected by COVID-19 in San Bartolome la Merced
          </p>
          <Button
              variant="primary"
              disabled={this.state.isLoading}
              onClick={!this.state.isLoading ? this.handleClick : null}
            >
              {this.state.isLoading ? 'Loading…' : 'Haz tu Donación'}
            </Button>
        </header>
      </div>
    )
  }
}


