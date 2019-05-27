import React, { Component } from 'react';
import './Issue.css'
import moment from 'moment-timezone';


class Issue extends Component {

  getLabels = (lables) => {  
    return lables.map(label => {
      return <div className="Issue-label" key={label.id}>
          <div className="Issue-labelInner" style={{'backgroundColor': '#' + label.color}}>
            {label.name}
          </div>
      </div>
    })
  }

  render() {
    const { issue } = this.props
    const usertimezone = moment.tz.guess();
    const value = moment.utc(new Date(issue.created_at));
    const formatDate = moment.tz(value,usertimezone);
    const momentDate = formatDate.fromNow();
    let hideShowComments;
    if(issue.comments >0){
      hideShowComments = 
      <a href={issue.comments_url}>
        <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" ><path className="Issue-commentIcon" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path></svg>
        <span>{issue.comments}</span>
      </a>
    }

    return (
      <div className="Issue-container">
        <div className="Issue-icon">
          <svg viewBox="0 0 14 16" version="1.1" width="14" height="16"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
        </div>
        <div className="Issue-cardInner">
          <div className="Issue-title">
            <a href={issue.html_url}>{issue.title}</a>
            {this.getLabels(issue.labels)}
          </div>
          <div className="Issue-listDetails">
            <p>#{issue.number} {momentDate} by <a href={issue.user.html_url}>{issue.user.login}</a></p>
          </div>
        </div>
        <div className="Issue-commentsSection">
          {hideShowComments}
        </div>
      </div>
    )
  }
}

export default Issue