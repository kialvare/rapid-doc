import React, { Component } from 'react';

const styles = {
	container: {
		height: 30,
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		color: '#848484',
	},
}

export default class ContentTitle extends Component {
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
