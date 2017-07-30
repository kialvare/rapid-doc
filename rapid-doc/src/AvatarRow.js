import React, { Component } from 'react';
import Avatar from './Avatar'

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		color: '#848484',
	},
	avatarRow: {
		display: 'flex',
		marginBottom: 4,
	},
	avatar: {
		marginLeft: 6,
	},
}

export default class Contributers extends Component {
	render() {
		const { users } = this.props

		const avatars = users.map(
			(user) => (
				<div style={styles.avatar} key={user}>
					<Avatar image={user} />
				</div>
			)
		);

		return (
			<div style={styles.container}>
				<div style={styles.avatarRow}>
					{avatars}
				</div>
				<div>
					{users.length} Contributors
				</div>
			</div>
		);
	}
}

