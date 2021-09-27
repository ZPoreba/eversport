import './App.css';
import { Router } from "react-router-dom";
import MainSwitch from "./Switch";
import { createBrowserHistory } from 'history';
import React from "react";


function App() {
  return (
      <Router history={createBrowserHistory()}>
        <div className="App">
            <div className={'content'} style={{width: '100%', display: 'flex'}}>
                <MainSwitch />
            </div>
        </div>
      </Router>
  );
}

export default App;
