import React, { Component } from 'react';

const styles = {
	container: {
		height: 30,
		paddingLeft: 65,
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		color: '#979797',
	},
}

styles.containerSelected = {
	...styles.container,
	backgroundColor: '#45A6FF',
}

styles.textSelected = {
	...styles.text,
	fontWeight: 500,
	color: 'white',
}

export default class ListItem extends Component {
	render() {
		const { text, selected } = this.props

		return (
			<div style={selected ? styles.containerSelected : styles.container}>
			<div style={selected ? styles.textSelected : styles.text}>
			{text}
			</div>
			</div>
		);
	}
}
