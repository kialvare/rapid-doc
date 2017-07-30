import React, { Component } from 'react';

const styles = {
	link: {
		fontSize: 16,
    color: '#46A6FF',
    display: 'inline-block',
	},
}

export default class Link extends Component {
	render() {
		const { text, onClick } = this.props
		return (
      <div
        style={styles.link}
        onClick={onClick}
      >
        {text}
      </div>
		);
	}
}
