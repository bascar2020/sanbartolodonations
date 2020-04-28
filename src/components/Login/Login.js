import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg';
import './Login.css';
import { auth } from "../../services/fire"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)

    this.state = {
      isLoading : false
    }
}

handleClick = () => {
  
    this.setState({isLoading:true});
    auth.signInAnonymously()
    auth.onAuthStateChanged( user => {
      if (user) {
        if(this._isMounted){
          this.setState({isLoading:false});
          this.props.history.push('/home');
        }
      } else {
        if(this._isMounted){
          this.setState({isLoading:false});
        }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;

    auth.onAuthStateChanged( user => {
      if (user) {
        if(this._isMounted){
          this.setState({isLoading:false});
          this.props.history.push('/home');
        }
      } else {
        if(this._isMounted){
          this.props.history.push('/');
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <p>
          Registra tus donaciones de manera anonima a las personas afectadas por el COVID-19 en el Colegio San Bartolome la Merced
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


