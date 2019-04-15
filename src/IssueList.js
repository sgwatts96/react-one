import React, { Component } from 'react';
import './IssueList.css';
import Issue from './Issue.js';

class IssueList extends Component {

  constructor(props){
    super(props);

    this.countOpenAndClosed([props])
  }

  countOpenAndClosed(issues) {
    let open = issues.filter(issue => issue.state === 'open').length
    let closed = issues.filter(issue => issue.state === 'closed').length

    this.numIssuesOpen = open
    this.numIssuesClosed = closed
  }

  createIssues = (issues) => {
   return issues.map(issue => {
      return <Issue key={issue.number} issue={issue} />
    })
  }

  render() {
    const { issues } = this.props

    return (
      <div className='container1'>
        <table>
          <thead>
            <tr>
            <th>
            <td>
            <div className="IssueList-tableHeader">
              <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              {this.numIssuesOpen} Open
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
              {this.numIssuesClosed} Closed 
              Author
              Labels
              Projects
              Milestones
              Assignee
              Sort
            </div>
            </td>
            </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            {this.createIssues(issues)}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default IssueList