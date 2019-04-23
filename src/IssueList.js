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
  handleLabelClick() {
    this.setState(state => ({
      isLabelsToggleOn: !state.isLabelsToggleOn
    }));
  }
  handleProjectClick() {
    this.setState(state => ({
      isProjectsToggleOn: !state.isProjectsToggleOn
    }));
  }
  handleMilestoneClick() {
    this.setState(state => ({
      isMilestonesToggleOn: !state.isMilestonesToggleOn
    }));
  }
  handleAssigneeClick() {
    this.setState(state => ({
      isAssigneeToggleOn: !state.isAssigneeToggleOn
    }));
  }
  handleSortClick() {
    this.setState(state => ({
      isSortToggleOn: !state.isSortToggleOn
    }));
  }

  getAuthorData = (issues) => {
    return issues.map(issue => {
      return issue.user
    })
  }



  render() {
    const { issues } = this.props
    const openIssuesCount = issues.filter(item => item.state === 'open').length;
    const closedIssuesCount = issues.filter(item => item.state === 'closed').length;

    let authorButton;
    let labelsButton;
    let projectsButton;
    let milestonesButton;
    let assigneeButton;
    let sortButton;

    if (this.state.isAuthorToggleOn) {
      let authorData = this.getAuthorData(myissues);
      authorButton = <Author action={this.handleAuthorClick} title="Filter by author" placeholderText="Filter users" isSearchable="true" data={authorData} filter={this.processFilter}/>;
    } else {
      authorButton = null;
    }

    if (this.state.isLabelsToggleOn) {
      labelsButton = <Author action={this.handleLabelClick} title="Filter by label" placeholderText="Filter labels" helpText="hi" isSearchable={true} defaultOption="Unlabeled" />;
    } else {
      labelsButton = null;
    }

    if (this.state.isProjectsToggleOn) {
      projectsButton = <Author action={this.handleProjectClick} title="Filter by project" placeholderText="Filter projects" isSearchable={true}/>;
    } else {
      projectsButton = null;
    }

    if (this.state.isMilestonesToggleOn) {
      milestonesButton = <Author action={this.handleMilestoneClick} title="Filter by milestone" placeholderText="Filter milestones" isSearchable={true} defaultOption="Issues with no milestone" />;
    } else {
      milestonesButton = null;
    }

    if (this.state.isAssigneeToggleOn) {
      assigneeButton = <Author action={this.handleAssigneeClick} title="Filter by who's assigned" placeholderText="Filter users" isSearchable={true} defaultOption="Assigned to nobody" />;
    } else {
      assigneeButton = null;
    }

    if (this.state.isSortToggleOn) {
      sortButton = <Author action={this.handleSortClick} title="Sort by" isSearchable={false} />;
    } else {
      sortButton = null;
    }

    return (
      <div className='container1'>
        <table>
          <thead>
            <tr>
              <th>
                <div className="IssueList-tableHeader">
                <div className="IssueList-tableHeaderItem">
                  <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                  {this.state.openIssuesCount} Open
                </div>
                <div className="IssueList-tableHeaderItem">
                  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                  {this.state.closedIssuesCount} Closed 
                </div>
                <button onClick={this.handleAuthorClick} className="IssueList-tableHeaderButtonArrowStart">
                    Author <div className="IssueList-tableHeaderButtonArrow" />
                </button>
                {authorButton}
                <button onClick={this.handleLabelClick}>
                    Labels <div className="IssueList-tableHeaderButtonArrow" />
                    {labelsButton}
                </button>
                <button onClick={this.handleProjectClick}>
                    Projects <div className="IssueList-tableHeaderButtonArrow" />
                    {projectsButton}
                </button>
                <button onClick={this.handleMilestoneClick}>
                    Milestones <div className="IssueList-tableHeaderButtonArrow" />
                    {milestonesButton}
                </button>
                <button onClick={this.handleAssigneeClick}>
                    Assignee <div className="IssueList-tableHeaderButtonArrow" />
                    {assigneeButton}
                </button>
                <button onClick={this.handleSortClick}>
                    Sort <div className="IssueList-tableHeaderButtonArrow" />
                    {sortButton}
                </button>
              </div>
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