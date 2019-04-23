import React, { Component } from 'react';
import './Author.css'

class Author extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {resultValue: ''};
	}

	processData = (data) => {
		return data.map(author => {
			return 	<button className="Author-item" key={author.id} onClick={()=>this.handleClick(author.login)}><img className="Author-itemAvatar" src={author.avatar_url} alt=""/><span>{author.login}</span></button>
		})
	}

	handleClick(value) {
		this.setState({resultValue: value});
		let data = {
			'type':'Author',
			'criteria':value
		};

		this.props.filter(data);
	}

  	render() {
		let search = (this.props.isSearchable ? <div ><input className="Author-search" placeholder={this.props.placeholderText}></input></div> : "");
		let defaultOption = (this.props.defaultOption ? <div className="Author-item">{this.props.defaultOption}</div> : "");

		return (
		<div className="Author-modal">
			<div className="Author-item"><span>{this.props.title}</span></div>
			{search}
			{defaultOption}
			{this.processData(this.props.data)}
		</div>
		)
	}
}

export default Author