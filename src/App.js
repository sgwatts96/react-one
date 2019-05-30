import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IssueList from './IssueList';
import testData from './data.json';


class App extends Component {
  constructor(){
    super();
    this.state = {
      issues: testData,
      repo: '',
      repoOwner: '',
      errorMsg: ''
    }
  }

  getIssues(){
    if(this.state.repo && this.state.repoOwner){
      fetch('https://api.github.com/repos/' + this.state.repoOwner + '/' + this.state.repo + '/issues',{
        method: 'GET'
      })
      .then(response => response.json())
      .then(results =>{
        if(results.length > 0){
          this.setState({ issues: results,
                          errorMsg: ''})
        }else{
          const msg = <h4>No issues found</h4>
          this.setState({errorMsg: msg})
        }
      })
      .catch((error) => {
        console.log('issues error: ' + JSON.stringify(error))
      })
    } else{
      const msg = <h4>Please provide a repo owner and repo name before searching for issues.</h4>;
      this.setState({errorMsg: msg});
    }
  }

  doSearch(event) {
    if(event.key === 'Enter'){
      this.getIssues();
    }
  }

  reset(){
    this.setState({issues: testData,
                    repo: '',
                    repoOwner: '',
                    errorMsg: ''})
  }

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
          <div>
            {this.state.errorMsg}
          </div>
          <div>
            <div className="App-details">
              <label className="App-input" htmlFor="repoOnwer">Repo Owner:</label>
              <input id="textrepoInput" 
                        type="text" 
                        value={this.state.repoOwner}
                        onChange={event => {
                          let stats = event.target.value;
                          this.setState({ repoOwner: stats });
                        }}
              />
              <label className="App-input" htmlFor="repo">Repo Name:</label>
              <input id="textrepoInput" 
                        type="text" 
                        value={this.state.repo}
                        onChange={event => {
                          let stats = event.target.value;
                          this.setState({ repo: stats });
                        }}
                        onKeyUp={event => this.doSearch(event)}
              />
              <button className='App-button' onClick={() => this.getIssues()}>Fetch Issues</button>
              <button className='App-button' onClick={() => this.reset()}>Reset</button>
            </div>
            <IssueList issues={this.state.issues}/>
          </div>
      </div>
    );
  }
}

export default App;