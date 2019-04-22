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

		this.ref = React.createRef();
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
			// this.props.action();
		}
	}
  	render() {
		return (
		<div ref={this.ref} className="Author-modal">
			<div className="Author-item"><span>Filter by author</span></div>
			<div ><input className="Author-search" placeholder="Filter Users"></input></div>
			<div className="Author-item">results</div>
		</div>
		)
	}
}

export default Author