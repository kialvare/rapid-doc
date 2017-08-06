import React, { Component } from 'react';

const styles = {
	container: {
		height: 36,
		paddingLeft: 30,
		display: 'flex',
		alignItems: 'center',
		marginTop: 20,
	},
	text: {
		fontWeight: 300,
		fontSize: 12,
		color: 'rgba(150,150,150,0.69)',
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
