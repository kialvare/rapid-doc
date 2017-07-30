import React, { Component } from 'react';

const styles = {
	container: {
		height: 24,
		paddingLeft: 30,
		paddingBottom: 10,
		display: 'flex',
	},
	text: {
		fontSize: 16,
		color: '#979797',
		paddingLeft: 10,
	},
	image: {
		height: 24,
		width: 24,
		borderRadius: 100,
	},
}

export default class UserRow extends Component {
	render() {
		const { text, image } = this.props

		return (
			<div style={styles.container}>
				<div style={styles.image}>
					<img src={image} alt="" />
				</div>
				<div style={styles.text}>
					{text}
				</div>
			</div>
		);
	}
}
