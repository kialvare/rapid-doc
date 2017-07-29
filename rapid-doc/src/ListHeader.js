import React, { Component } from 'react';

const styles = {
	container: {
		height: 30,
		paddingLeft: 30,
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		fontWeight: 300,
		fontSize: 15,
		color: '#979797',
	},
}

export default class ListHeader extends Component {
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
