import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import { auth } from "../../services/fire"
import logo from '../../assets/images/logo.svg';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabsC from '../TabsC/TabsC';
import { Link } from "react-router-dom";


export default class Home extends Component {
  
  _isMounted = false;

  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }
  }
  
  componentDidMount(){
    this._isMounted = true;
    
   auth.onAuthStateChanged( user => {
      if (user) {
        if (this._isMounted) {
          this.setState({user: user.metadata.lastSignInTime})
        }
      } else {
          // No user is signed in.
          console.log('There is no logged in user');
          if(this._isMounted){
            this.props.history.push('/');
          }
      }
    });
  }

  logout() {
    
    auth.signOut().then(function() {
      // Sign-out successful.
      console.log('Sign-out successful.')
    })
    .catch(function(error) {
      // An error happened
      console.error(error)
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            />{' '}
          SBLM Donations
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Last Signed: {this.state.user} <Link to="/" onClick={this.logout}> Salir</Link>
          </Navbar.Text> 
        </Navbar.Collapse>
        </Navbar>
        
         <TabsC/>
        </div>
    )
  }
}