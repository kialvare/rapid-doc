import React, { Component } from 'react';

const styles = {
	container: {
		height: 24,
		width: 24,
		display: 'flex',
	},
	image: {
		height: 24,
		width: 24,
		borderRadius: 100,
		// boxShadow: '0 0 0 1px white, 0 0 0 2px #45A6FF',
	},
}

export default class Avatar extends Component {
	render() {
		const { image } = this.props

		return (
			<div style={styles.image}>
				<img src={image} alt="" />
			</div>
		);
	}
}
