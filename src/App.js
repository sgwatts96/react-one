import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import IssueList from './IssueList';
import testData from './data.json';
//import P from './toReview';

const characters = [
  {
    number: '000001',
    title: 'This is my very first issue',
    createdDt: '5 hours ago',
    cretedBy: 'Bob'
  },
  {
    number: '000002',
    title: 'This is a second issue',
    createdDt: '4 hours ago',
    cretedBy: 'Bobbert'
  },
  {
    number: '000003',
    title: 'This is the third time which is a charm',
    createdDt: '3 hours ago',
    cretedBy: 'Bobby Tables'
  },
  {
    number: '000004',
    title: 'This is the last issue that will load',
    createdDt: '1 hours ago',
    cretedBy: 'Vic'
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body>
        <div className="container">
          <Table characterData={characters} vic="aewsome" />
        </div>
        <div>
          <IssueList issues={testData}/>
        </div>
        <div>

        </div>
        </body>
      </div>
    );
  }
}

export default App;