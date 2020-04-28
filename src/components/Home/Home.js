import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabsC from '../TabsC/TabsC';
function Home() {


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
  </Navbar>
  <TabsC/>
    </div>
    
  );
}

export default Home;
