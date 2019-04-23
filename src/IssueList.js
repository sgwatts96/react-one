import React, { Component } from 'react';
import './IssueList.css';
import Issue from './Issue.js';
import Author from './Author.js';
import Popover from 'react-tiny-popover'

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

    this.processFilter = this.processFilter.bind(this);
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

  getAuthorData = (issues) => {
    return issues.map(issue => {
      return issue.user
    })
  }

  processFilter = (data) => {
    if(data.type === 'Author'){
      let issues = this.state.issues
      let filteredIssues = issues.filter(item => item.user.login === data.criteria)
      this.setState({issues: filteredIssues});
    }
    return;
  }

  getHeaderButton = (buttonLabel, toggleVariable, isStart) => {
    let buttonClassName = (isStart ? 'IssueList-tableHeaderButtonArrowStart': '')
    
    let button =  <button className={buttonClassName} onClick={() => this.setState({ [toggleVariable]: !this.state[toggleVariable] })}>
                              {buttonLabel} <div className="IssueList-tableHeaderButtonArrow" />
                  </button>
    return button
  }


  render() {
    let authorData = this.getAuthorData(this.state.issues);
    let authorButton =  <Popover
                          isOpen={this.state.isAuthorToggleOn}
                          onClickOutside={() => this.setState({ isAuthorToggleOn: false })}
                          position={'bottom'}
                          content={(
                            <Author title="Filter by author" placeholderText="Filter users" isSearchable="true" data={authorData} filter={this.processFilter}/>
                          )}>
                          {this.getHeaderButton("Author", "isAuthorToggleOn", true)}
                        </Popover>

    let labelsButton =  <Popover
                          isOpen={this.state.isLabelsToggleOn}
                          onClickOutside={() => this.setState({ isLabelsToggleOn: false })}
                          position={'bottom'}
                          content={(
                            <Author title="Filter by label" placeholderText="Filter labels" helpText="hi" isSearchable={true} defaultOption="Unlabeled" />
                          )}>
                          {this.getHeaderButton("Labels", "isLabelsToggleOn", false)}
                        </Popover>

    let projectsButton =  <Popover
                            isOpen={this.state.isProjectsToggleOn}
                            onClickOutside={() => this.setState({ isProjectsToggleOn: false })}
                            position={'bottom'}
                            content={(
                              <Author title="Filter by project" placeholderText="Filter projects" isSearchable={true}/>
                            )}>
                            {this.getHeaderButton("Projects", "isProjectsToggleOn", false)}
                          </Popover>

    let milestonesButton =  <Popover
                              isOpen={this.state.isMilestonesToggleOn}
                              onClickOutside={() => this.setState({ isMilestonesToggleOn: false })}
                              position={'bottom'}
                              content={(
                                <Author title="Filter by milestone" placeholderText="Filter milestones" isSearchable={true} defaultOption="Issues with no milestone" />
                              )}>
                              {this.getHeaderButton("Milestones", "isMilestonesToggleOn", false)}
                            </Popover>

    let assigneeButton = <Popover
                            isOpen={this.state.isAssigneeToggleOn}
                            onClickOutside={() => this.setState({ isAssigneeToggleOn: false })}
                            position={'bottom'}
                            content={(
                              <Author title="Filter by who's assigned" placeholderText="Filter users" isSearchable={true} defaultOption="Assigned to nobody" />
                            )}>
                            {this.getHeaderButton("Assignees", "isAssigneeToggleOn", false)}
                          </Popover>

    let sortButton = <Popover
                        isOpen={this.state.isSortToggleOn}
                        onClickOutside={() => this.setState({ isSortToggleOn: false })}
                        position={'bottom'}
                        content={(
                          <Author title="Sort by" isSearchable={false} />
                        )}>
                        {this.getHeaderButton("Sort", "isSortToggleOn", false)}
                      </Popover>

    return (
      <div className='container1'>
        <table>
          <thead>
            <tr>
              <th>
                <div className="IssueList-tableHeader">
                <div className="IssueList-tableHeaderItem">
                  <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                    {this.state.issues.filter(item => item.state === 'open').length} Open
                </div>
                <div className="IssueList-tableHeaderItem">
                  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                    {this.state.issues.filter(item => item.state === 'closed').length} Closed 
                </div>
                {authorButton}
                {labelsButton}
                {projectsButton}
                {milestonesButton}
                {assigneeButton}
                {sortButton}
              </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.createIssues(this.state.issues)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default IssueList