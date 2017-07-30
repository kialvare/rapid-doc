import React, { Component } from 'react';

const styles = {
	container: {
		height: 25,
		paddingLeft: 20,
		display: 'flex',
	},
	text: {
		fontSize: 16,
		color: '#979797',
		paddingLeft: 10,
	},
	image: {
		borderRadius: 100,
	},
}

export default class UserRow extends Component {
	render() {
		const { text, image } = this.props

		return (
			<div style={styles.container}>
				<div style={styles.image}>
					<img src={image} alt=""/>
				</div>
				<div style={styles.text}>
					{text}
				</div>
			</div>
		);
	}
}
