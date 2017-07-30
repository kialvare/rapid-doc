import React, { Component } from 'react';

const styles = {
	container: {
		height: 36,
		paddingLeft: 50,
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
	},
	text: {
		fontSize: 16,
		fontWeight: 300,
		color: '#979797',
	},
}

styles.containerSelected = {
	...styles.container,
	backgroundColor: '#45A6FF',
}

styles.textSelected = {
	...styles.text,
	fontWeight: 400,
	color: 'white',
}

export default class ListItem extends Component {
	render() {
		const { text, selected, onClick } = this.props

		return (
			<div
				style={selected ? styles.containerSelected : styles.container}
				onClick={onClick}
			>
				<div style={selected ? styles.textSelected : styles.text}>
					{text}
				</div>
			</div>
		);
	}
}
