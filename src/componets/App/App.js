import React from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Register donations for people affected by COVID-19 in San Bartolome la Merced
        </p>
        <a
          className="App-link"
          href="/"
          rel="noopener noreferrer"
        >
          Haz tu Donación
        </a>
      </header>
    </div>
  );
}

export default App;
