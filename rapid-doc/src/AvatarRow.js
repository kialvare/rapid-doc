import React, { Component } from 'react';
import Avatar from './Avatar'

const styles = {
	container: {
		display: 'flex',
	},
	row: {
		marginLeft: 6,
	},
}

export default class Contributers extends Component {
	render() {
		const { users } = this.props

		const avatars = users.map(
			(user) => <div style={styles.row}><Avatar image={user}/></div>
		);
		
		return(
			<div style={styles.container}>{avatars}</div>
		);
	}
}

