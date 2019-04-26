import React, { Component } from 'react';
import './Author.css'

class Author extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.state = {	resultValue: '',
						searchText: '',
						originalOptions: this.props.data,
						filteredOptions: ''};
	}

	processData() {
		if(this.state.filteredOptions){
			return this.state.filteredOptions.map(author => {
				return 	<button className="Author-item" key={author.id} onClick={()=>this.handleClick(author.login)}><img className="Author-itemAvatar" src={author.avatar_url} alt=""/><span>{author.login}</span></button>
			})
		} else if(this.state.originalOptions){
			return this.state.originalOptions.map(author => {
				return 	<button className="Author-button" key={author.id} onClick={()=>this.handleClick(author.login)}><img className="Author-itemAvatar" src={author.avatar_url} alt=""/><span>{author.login}</span></button>
			})
		}else {
			return null;
		}
	}

	handleClick(value) {
		this.setState({resultValue: value});
		let data = {
			'type':'Author',
			'criteria':value
		};

		this.props.filter(data);
	}

	handleKeyUp(event) {
		if(event.target.value){
			let filteredOpt = this.state.originalOptions.filter(opt =>{
				if(opt.login.includes(event.target.value) > 0) {
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
		let defaultOption = (this.props.defaultOption ? <div className="Author-item">{this.props.defaultOption}</div> : "");
		let searchOption = (this.state.searchText.length > 1 ? <button className="Author-searchButton" key="SearchOption" onClick={()=>this.handleClick(this.state.searchText)}><span>{this.props.searchLabel + ':' + this.state.searchText} <br/> Filter by this user</span></button>: "");

		return (
		<div className="Author-modal">
			<div className="Author-itemTitle"><span>{this.props.title}</span></div>
			{search}
			{defaultOption}
			{searchOption}
			{this.processData()}
		</div>
		)
	}
}

export default Author