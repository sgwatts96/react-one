import React, { Component } from 'react';
import './Author.css'

class Author extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		let filterCriteriaMap = new Map()
		filterCriteriaMap.set('author', 'login');
		filterCriteriaMap.set('label', 'name');
		filterCriteriaMap.set('milestone', 'name');

		this.state = {	resultValue: '',
						searchText: '',
						originalOptions: this.props.data,
						filteredOptions: '',
						type: this.props.type,
						filterMap: filterCriteriaMap};
	}

	processData() {
		let issues;

		if(this.state.filteredOptions){
			issues = this.state.filteredOptions
		} else if(this.state.originalOptions){
			issues = this.state.originalOptions
		}

		if(issues){
			if(this.state.type === 'author') {
				return issues.map(author => {
					return 	<button className="Author-item" key={author.id} onClick={()=>this.handleClick(author.id)}><img className="Author-itemAvatar" src={author.avatar_url} alt=""/><span>{author.login}</span></button>
				})
			} else if(this.state.type === 'label'){
				return issues.map(label => {
					return 	<button className="Author-item" key={label.id} onClick={()=>this.handleClick(label.id)}><span className="Author-itemLabel" style={{'backgroundColor': '#' + label.color}}/><span>{label.name}</span></button>
				})
			} else if(this.state.type === 'milestone'){
				return issues.map(milestone => {
					return 	<button className="Author-item" key={milestone.id} onClick={()=>this.handleClick(milestone.id)}><span className="Author-itemLabel" /><span>{milestone.title}</span></button>
				})
			}
		} else {
			return null;
		}
	}

	handleClick(value) {
		this.setState({resultValue: value});
		let data = {
			'type': this.state.type,
			'criteria':value
		};

		this.props.filter(data);
	}

	handleKeyUp(event) {
		let mapping = this.state.filterMap.get(this.state.type);
		if(event.target.value){
			let filteredOpt = this.state.originalOptions.filter(opt =>{
				if(opt[mapping].includes(event.target.value) > 0) {
					return opt;
				} else{
					return null;
				}
			})

			this.setState({	searchText: event.target.value,
							filteredOptions: filteredOpt});
		} else{
			this.setState({filteredOptions: this.state.originalOptions});
		}
	}

  	render() {
		let search = (this.props.isSearchable ? <div className="Author-search"><input id="searchBox" className="Author-searchInput" placeholder={this.props.placeholderText} type="text" autoFocus={true} onChange={this.handleKeyUp}></input></div> : "");
		let defaultOption = (this.props.defaultOption && this.state.searchText.length < 2? <div className="Author-item">{this.props.defaultOption}</div> : "");
		let searchOption = (this.state.searchText.length > 1 && this.props.searchLabel ? <button className="Author-searchButton" key="SearchOption" onClick={()=>this.handleClick(this.state.searchText)}><span>{this.props.searchLabel + ':' + this.state.searchText} <br/> Filter by this user</span></button>: "");
		let noResults = (!this.props.searchLabel && this.state.filteredOptions.length < 1 && this.state.searchText.length > 1 ? <div className="Author-item"><span>No {this.state.type} found. Sorry about that.</span></div>: "");


		return (
		<div className="Author-modal">
			<div className="Author-itemTitle"><span>{this.props.title}</span></div>
			{search}
			{defaultOption}
			{searchOption}
			{this.processData()}
			{noResults}
		</div>
		)
	}
}

export default Author