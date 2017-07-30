import React, { Component } from 'react';
import Avatar from './Avatar'

const styles = {
	container: {
		height: 24,
		width: 174,
		paddingLeft: 65,
	},
}

export default class Contributers extends Component {
	render() {
		const { users } = this.props

		const avatars = users.map(
			(user) => <div style={styles.container}><Avatar image={user}/></div>
		);
		
		return(
			<div>{avatars}</div>
		);
	}
}

