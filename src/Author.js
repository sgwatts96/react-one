import React, { Component } from 'react';
import './Author.css'
import PropTypes from 'prop-types';

class Author extends Component {
	static propTypes = {
		onClick: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.ref = React.createRef();

		this.state = {resultValue: ''};

	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}


	handleClickOutside = (e) => {
		const isOutside = !this.ref.current.contains(e.target)
		if (isOutside){
			this.props.action();
		}
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
		<div ref={this.ref} className="Author-modal">
			<div className="Author-item"><span>{this.props.title}</span></div>
			{search}
			{defaultOption}
			{this.processData(this.props.data)}
		</div>
		)
	}
}

export default Author