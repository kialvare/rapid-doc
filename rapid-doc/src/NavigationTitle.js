import React, { Component } from 'react';

const styles = {
	container: {
		height: 45,
		paddingLeft: 25,
		paddingTop: 25,
		display: 'flex',
	},
	text: {
		fontSize: 25,
		color: 'black',
	},
}

export default class NavigationTitle extends Component {
	render() {
		const { text } = this.props
		return (
			<div style={styles.container}>
			<div style={styles.text}>
				{text}
			</div>
			</div>
		);
	}
}
