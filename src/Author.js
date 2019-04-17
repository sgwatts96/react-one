import React, { Component } from 'react';
import './Author.css'

class Author extends Component {
	constructor(props) {
		super(props);
	
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			alert('You clicked outside of me!');
			this.props.handleAuthorClick();

		}
	}
  	render() {
		return (
		<div ref={this.setWrapperRef} className="Author-modal">
			HI
		</div>
		)
	}
}

export default Author