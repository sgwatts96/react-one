import React, { Component } from 'react';
import './IssueList.css';
import Issue from './Issue.js';
import Author from './Author.js';

class IssueList extends Component {

  constructor(props){
    super(props);
    this.state = {isAuthorToggleOn: false,
                  isLabelsToggleOn: false,
                  isProjectsToggleOn: false,
                  isMilestonesToggleOn: false,
                  isAssigneeToggleOn: false,
                  isSortToggleOn: false,
                  openIssuesCount: 0,
                  closedIssuesCount: 0,
                  issues: this.props.issues,
                };

        

    this.handleAuthorClick = this.handleAuthorClick.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleMilestoneClick = this.handleMilestoneClick.bind(this);
    this.handleAssigneeClick = this.handleAssigneeClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.processFilter = this.processFilter.bind(this);

  }

  componentDidMount() {
      //this.setState({issues: this.props});

      /*if(this.state.issues && this.state.issues.length > 0){
        let {issuesToCount} = this.state.issues;
        let open = issuesToCount.filter(item => item.state === 'open').length;
        let closed = issuesToCount.filter(item => item.state === 'closed').length;
      
        this.setState({openIssuesCount: open,
                        closedIssuesCount: closed});
      }*/
  }

  createIssues = (issues) => {
    if(issues){
      return issues.map(issue => {
        return <Issue key={issue.number} issue={issue} />
      })
    } else{
      return;
    }

  }

  handleAuthorClick() {
    this.setState(state => ({
      isAuthorToggleOn: !state.isAuthorToggleOn
    }));
  }


  render() {
    const { issues } = this.props
    const openIssuesCount = issues.filter(item => item.state === 'open').length;
    const closedIssuesCount = issues.filter(item => item.state === 'closed').length;

    let authorButton;

    if (this.state.isAuthorToggleOn) {
      authorButton = <Author action={this.handleAuthorClick} />;
    } else {
      authorButton = null;
    }

    return (
      <div className='container1'>
        <table>
          <thead>
            <tr>
            <th>
            <td>
            <div className="IssueList-tableHeader">
              <div className="IssueList-tableHeaderItem">
                <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                {openIssuesCount} Open
              </div>
              <div className="IssueList-tableHeaderItem">
                <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                {closedIssuesCount} Closed 
              </div>
              <button onClick={this.handleAuthorClick}>
                  Author <div className="IssueList-tableHeaderButtonArrow" />
                  {authorButton}
              </button>


              
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