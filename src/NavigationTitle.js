import React, { Component } from 'react';

const styles = {
	container: {
		padding: '25px 30px',
	},
	text: {
		fontWeight: 300,
		fontSize: 24,
		color: 'rgba(0,0,0,0.69)',
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
