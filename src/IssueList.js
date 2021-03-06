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
                  originalIssues: this.props.issues,
                  issues: this.props.issues,
                  openClosedIssues: this.props.issues,
                  currentFilter: '',
                  showingOpenClosed: 'open'
                };
    this.processFilter = this.processFilter.bind(this);
    this.processSort = this.processSort.bind(this);
    this.countOpenClosed = this.countOpenClosed.bind(this);
  }

  componentDidMount() {
    this.countOpenClosed();
  }

  componentDidUpdate(prevProps) {
    if(this.props.issues !== prevProps.issues)
    {
      let openCount = this.props.issues.filter(item => item.state === 'open').length
      let closedCount = this.props.issues.filter(item => item.state === 'closed').length
      this.setState({ originalIssues: this.props.issues,
                      issues: this.props.issues,
                      openIssuesCount: openCount,
                      closedIssuesCount: closedCount})
    }
  }

  createIssues = (issues) => {
    if(issues){
      return issues.map(issue => {
        if(issue.state === this.state.showingOpenClosed){
          return <Issue key={issue.number} issue={issue} />
        } else{
          return null
        }
      })
    } else{
      return;
    }
  }

  getDefaultButtonData = (dataType) => {
    let defaultData = [];
    let issues;

    if(this.state.currentFilter){
      issues = this.state.issues
    } else{
      issues = this.state.originalIssues;
    }

    if(dataType === 'Author') {
      defaultData = issues.map(issue => {
        return issue.user
      })
    } else if(dataType === 'Label'){
      issues.map(issue => {
        if(issue.labels){
          return issue.labels.map(label => {
            defaultData.push(label);
            return null;
          })
        } else{
          return null;
        }
      })
    } else if(dataType === 'Milestone'){
      defaultData = issues.map(issue => {
        return issue.milestone
      })
    } else if(dataType === 'Assignee'){
      defaultData = issues.map(issue => {
        return issue.assignee;
      })
    }
    return this.dedupeArray(defaultData);
  }

  dedupeArray = (data) => {
    let ids = new Set();

    let arrayToReturn = [];
    
    data.map(item => {
      if(item && !ids.has(item.id)){
        ids.add(item.id);
        arrayToReturn.push(item);
      }
    })

    return arrayToReturn;
  }

  processFilter = (data) => {
    if(data){
      this.setState({currentFilter: data});
    } else{
      data = this.state.currentFilter;
    }

    let filteredIssues;
    let ocIssues;

    if(data.type === 'author'){
      let issues = this.state.originalIssues
      filteredIssues = issues.filter(item => item.user.id === data.criteria)
      ocIssues = filteredIssues.filter( item => item.state === this.state.showingOpenClosed);
    } else if(data.type === 'Open/Closed'){
      let issues = this.state.originalIssues
      filteredIssues = issues.filter(item => item.state === data.criteria && item.state === this.state.showingOpenClosed)
      this.setState({issues: filteredIssues});
    } else if(data.type === 'label'){
      let issues = this.state.originalIssues.filter(item => item.state === this.state.showingOpenClosed);
      filteredIssues = [];
      issues.map(item => {
        if(data.criteria === 'Unlabeled' && item.labels && item.labels.length === 0){
          filteredIssues.push(item);
        } else{
        let containsLabel = false;
          if(item.labels){
            item.labels.map(label =>{
              if(label.id === data.criteria){
                containsLabel = true;
              }
            })
            if(containsLabel){
              filteredIssues.push(item);
            }
          }
        }
      })
    } else if(data.type === 'milestone'){
      let issues = this.state.originalIssues
      if(data.criteria === 'Issues with no milestone'){
        filteredIssues = [];
        issues.map(issue =>{
          if(!issue.hasOwnProperty('milestone')){
            filteredIssues.push(issue);
          }
        })
      }else{
        filteredIssues = issues.filter(item => item.milestone.id === data.criteria && item.state === this.state.showingOpenClosed);
      }
    } else if(data.type === 'assignee'){
      let issues = this.state.originalIssues.filter(item => item.state === this.state.showingOpenClosed);
      filteredIssues = [];
      issues.map(item => {
        if(data.criteria === 'Assigned to nobody' && !item.hasOwnProperty('assignee')){
          filteredIssues.push(item);
        }else{
          let containsAssignee = false;
          if(item.assignees){
            item.assignees.map(assignee =>{
              if(assignee.id === data.criteria){
                containsAssignee = true;
              }
            })
            if(containsAssignee){
              filteredIssues.push(item);
            }
          }
        }
      })
    } else{
      filteredIssues = this.state.originalIssues;
    }

    this.setState({issues: filteredIssues, openClosedIssues: ocIssues});
    this.countOpenClosed(filteredIssues);

    return filteredIssues;
  }

  processSort = (sortBy) => {
    let sortMap = new Map()
    sortMap.set('newest', '{"field":"created_at","direction":"ab","isDate":"true"}');
    sortMap.set('oldest', '{"field":"created_at","direction":"ba","isDate":"true"}');
    sortMap.set('mostCommented', '{"field":"comments","direction":"ab"}');
    sortMap.set('leastCommented', '{"field":"comments","direction":"ba"}');
    sortMap.set('recentlyUpdated', '{"field":"updated_at","direction":"ab","isDate":"true"}');
    sortMap.set('leastRecentlyUpdated', '{"field":"updated_at","direction":"ba","isDate":"true"}');

    let filteredIssues;

    if(this.state.issues){
      filteredIssues = this.state.issues;
    } else if(this.state.originalIssues){
      filteredIssues = this.state.originalIssues;
    }

    if(filteredIssues){
      let sortDetails = JSON.parse(sortMap.get(sortBy));

      filteredIssues.sort(function(a,b) {
          if(sortDetails.direction === 'ab'){
            if(sortDetails.isDate){
              return new Date(a[sortDetails.field]) - new Date(b[sortDetails.field]);
            } else{
              return a[sortDetails.field] - b[sortDetails.field];
            }
          }else{
            if(sortDetails.isDate){
              return new Date(b[sortDetails.field]) - new Date(a[sortDetails.field]);
            } else {
              return b[sortDetails.field] - a[sortDetails.field];
            }
          }
      })
      this.setState({issues: filteredIssues});
    }
  }

  getHeaderButton = (buttonLabel, toggleVariable) => {
    let button =  <button onClick={() => this.setState({ [toggleVariable]: !this.state[toggleVariable] })}>
                    {buttonLabel} <div className="IssueList-headerItemArrow" />
                  </button>
    return button
  }

  handleOpenCloseClick = (button) => {
    if(button && button !== this.state.showingOpenClosed){
      this.setState({showingOpenClosed: button});

      this.processFilter(this.state.currentFilter);
    }
  }
  
  reset() {
    this.countOpenClosed(this.state.originalIssues)

    this.setState({ issues : this.state.originalIssues,
                    showingOpenClosed: 'open',
                    currentFilter: ''});
  }

  countOpenClosed(issues) {
    let issuesToCount;

    if(issues){
      issuesToCount = issues;
    } else if(!!this.state.issues){
      issuesToCount = this.state.issues;
    } else{
      issuesToCount = this.state.originalIssues;
    }
    if(issuesToCount){
      let openCount = issuesToCount.filter(item => item.state === 'open').length
      let closedCount = issuesToCount.filter(item => item.state === 'closed').length

      this.setState({openIssuesCount: openCount});
      this.setState({closedIssuesCount: closedCount});
    }
  }

  render() {
    let authorButton =  <Popover
                          isOpen={this.state.isAuthorToggleOn}
                          onClickOutside={() => this.setState({ isAuthorToggleOn: false })}
                          position={'bottom'}
                          content={(
                              <Author type="author" title="Filter by author" placeholderText="Filter users" isSearchable="true" data={this.getDefaultButtonData('Author')} filter={this.processFilter} searchLabel="author"/>
                          )}>
                          {this.getHeaderButton("Author", "isAuthorToggleOn", true)}
                        </Popover>

    let labelsButton =  <Popover
                          isOpen={this.state.isLabelsToggleOn}
                          onClickOutside={() => this.setState({ isLabelsToggleOn: false })}
                          position={'bottom'}
                          content={(
                            <Author type="label" title="Filter by label" placeholderText="Filter labels" isSearchable={true} data={this.getDefaultButtonData('Label')} filter={this.processFilter} defaultOption="Unlabeled" />
                          )}>
                          {this.getHeaderButton("Labels", "isLabelsToggleOn", false)}
                        </Popover>

    let projectsButton =  <Popover
                            isOpen={this.state.isProjectsToggleOn}
                            onClickOutside={() => this.setState({ isProjectsToggleOn: false })}
                            position={'bottom'}
                            content={(
                              <Author type="project" title="Filter by project" placeholderText="Filter projects" isSearchable={true}/>
                            )}>
                            {this.getHeaderButton("Projects", "isProjectsToggleOn", false)}
                          </Popover>

    let milestonesButton =  <Popover
                              isOpen={this.state.isMilestonesToggleOn}
                              onClickOutside={() => this.setState({ isMilestonesToggleOn: false })}
                              position={'bottom'}
                              content={(
                                <Author type="milestone" title="Filter by milestone" placeholderText="Filter milestones" isSearchable={true} data={this.getDefaultButtonData('Milestone')} filter={this.processFilter} defaultOption="Issues with no milestone" />
                              )}>
                              {this.getHeaderButton("Milestones", "isMilestonesToggleOn", false)}
                            </Popover>

    let assigneeButton = <Popover
                            isOpen={this.state.isAssigneeToggleOn}
                            onClickOutside={() => this.setState({ isAssigneeToggleOn: false })}
                            position={'bottom'}
                            content={(
                              <Author type="assignee" title="Filter by who's assigned" placeholderText="Filter users" isSearchable={true} data={this.getDefaultButtonData('Assignee')} filter={this.processFilter} defaultOption="Assigned to nobody" />
                            )}>
                            {this.getHeaderButton("Assignees", "isAssigneeToggleOn", false)}
                          </Popover>

    let sortButton = <Popover
                        isOpen={this.state.isSortToggleOn}
                        onClickOutside={() => this.setState({ isSortToggleOn: false })}
                        position={'bottom'}
                        content={(
                          <Author type="sort" title="Sort by" isSearchable={false} isSort={true} sort={this.processSort}/>
                        )}>
                        {this.getHeaderButton("Sort", "isSortToggleOn", false)}
                      </Popover>

    let openButtonStyle = (this.state.showingOpenClosed === 'open' ? 'IssueList-headerItem IssueList-headerItemSelected' : 'IssueList-headerItem');
    let closedButtonStyle = (this.state.showingOpenClosed === 'closed' ? 'IssueList-headerItem IssueList-headerItemSelected' : 'IssueList-headerItem');
    
    const resetButton = (this.state.currentFilter ? <button className='IssueList-resetButton' onClick={() => this.reset()}> <svg viewBox="0 0 12 16" version="1.1" width="12" height="16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>Clear current search query, filters, and sorts</button> : '')

    return (
      <div className='IssueList-mainContainer'>
        {resetButton}
        <div className="IssueList-header">
          <button className={openButtonStyle} onClick={() => this.handleOpenCloseClick('open')}>
            <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              {this.state.openIssuesCount} Open
          </button>
          <button className={closedButtonStyle} onClick={() => this.handleOpenCloseClick('closed')}>
            <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
              {this.state.closedIssuesCount} Closed
          </button>
          <div className="IssueList-headerItemSpacer" />
          {authorButton}
          {labelsButton}
          {projectsButton}
          {milestonesButton}
          {assigneeButton}
          {sortButton}
        </div>
        {this.createIssues(this.state.issues)}
      </div>
    )
  }
}

export default IssueList