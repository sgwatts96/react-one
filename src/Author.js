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
		filterCriteriaMap.set('assignee', 'login');


		this.state = {	resultValue: '',
						searchText: '',
						originalOptions: this.props.data,
						filteredOptions: '',
						type: this.props.type,
						filterMap: filterCriteriaMap,
						currentSort: 'oldest'};
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
					return 	<button className="Author-item Author-searchButton" key={author.id} onClick={()=>this.handleClick(author.id)}><img className="Author-itemAvatar" src={author.avatar_url} alt=""/><span>{author.login}</span></button>
				})
			} else if(this.state.type === 'label'){
				return issues.map(label => {
					return 	<button className="Author-item Author-searchButton" key={label.id} onClick={()=>this.handleClick(label.id)}><span className="Author-itemLabel" style={{'backgroundColor': '#' + label.color}}/><span>{label.name}</span></button>
				})
			} else if(this.state.type === 'milestone'){
				return issues.map(milestone => {
					return 	<button className="Author-item Author-searchButton" key={milestone.id} onClick={()=>this.handleClick(milestone.id)}><span className="Author-itemLabel" /><span>{milestone.title}</span></button>
				})
			} else if(this.state.type === 'assignee'){
				return issues.map(assignee => {
					return 	<button className="Author-item Author-searchButton" key={assignee.id} onClick={()=>this.handleClick(assignee.id)}><img className="Author-itemAvatar" src={assignee.avatar_url} alt=""/><span>{assignee.login}</span></button>
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

	prepareSort() {
		let sortOptions = [];
		let check = <svg style={{'padding':'0 .5rem 0 0'}} viewBox="0 0 12 16" version="1.1" width="12" height="16" ><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
		
		sortOptions.push(<button className="Author-item" key="newest" onClick={()=>this.handleSort('newest')}><span className={this.state.currentSort === 'newest' ? 'Author-selected' : 'Author-sortDefault'}>{this.state.currentSort === 'newest' ? check : ''}Newest</span></button>)
		sortOptions.push(<button className="Author-item" key="oldest" onClick={()=>this.handleSort('oldest')}><span className={this.state.currentSort === 'oldest' ? 'Author-selected' : 'Author-sortDefault'} >{this.state.currentSort === 'oldest' ? check : ''}Oldest</span></button>)
		sortOptions.push(<button className="Author-item" key="mostCommented" onClick={()=>this.handleSort('mostCommented')}><span className={this.state.currentSort === 'mostCommented' ? 'Author-selected' : 'Author-sortDefault'}>{this.state.currentSort === 'mostCommented' ? check : ''}Most Commented</span></button>)
		sortOptions.push(<button className="Author-item" key="leastCommented" onClick={()=>this.handleSort('leastCommented')}><span className={this.state.currentSort === 'leastCommented' ? 'Author-selected' : 'Author-sortDefault'}>{this.state.currentSort === 'leastCommented' ? check : ''}Least Commented</span></button>)
		sortOptions.push(<button className="Author-item" key="recentlyUpdated" onClick={()=>this.handleSort('recentlyUpdated')}><span className={this.state.currentSort === 'recentlyUpdated' ? 'Author-selected' : 'Author-sortDefault'}>{this.state.currentSort === 'recentlyUpdated' ? check : ''}Recently Updated</span></button>)
		sortOptions.push(<button className="Author-item" key="leastRecentlyUpdated" onClick={()=>this.handleSort('leastRecentlyUpdated')}><span className={this.state.currentSort === 'leastRecentlyUpdated' ? 'Author-selected' : 'Author-sortDefault'}>{this.state.currentSort === 'leastRecentlyUpdated' ? check : ''}Least Recently Updated</span></button>)

		return sortOptions;
	}

	handleSort(sortOption) {
		if(sortOption){
			this.setState({currentSort: sortOption});
	
			this.props.sort(sortOption);
		}
	}

  	render() {
		let search = (this.props.isSearchable ? <div className="Author-search"><input id="searchBox" className="Author-searchInput" placeholder={this.props.placeholderText} type="text" autoFocus={true} onChange={this.handleKeyUp}></input></div> : "");
		let defaultOption = (this.props.defaultOption && this.state.searchText.length < 2? <button className="Author-item Author-default" onClick={()=>this.handleClick(this.props.defaultOption)}>{this.props.defaultOption}</button> : "");
		let searchOption = (this.state.searchText.length > 1 && this.props.searchLabel ? <button className="Author-searchButton" key="SearchOption" onClick={()=>this.handleClick(this.state.searchText)}><span>{this.props.searchLabel + ':' + this.state.searchText} <br/> Filter by this user</span></button>: "");
		let noResults = (!this.props.searchLabel && this.state.filteredOptions.length < 1 && this.state.searchText.length > 1 ? <div className="Author-item"><span>No {this.state.type} found. Sorry about that.</span></div>: "");
		let sort = (this.props.isSort ? this.prepareSort() : '');

		return (
		<div className="Author-modal">
			<div className="Author-itemTitle"><span>{this.props.title}</span></div>
			{search}
			{defaultOption}
			{searchOption}
			{this.processData()}
			{noResults}
			{sort}
		</div>
		)
	}
}

export default Author