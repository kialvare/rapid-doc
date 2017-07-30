import React, { Component } from 'react';

import InputField from './InputField.js';
import ListHeader from './ListHeader.js';
import MessageRow from './MessageRow.js';
import UserRow from './UserRow.js';
import dev from './images/dev-gh.png'
import dude1 from './images/dude1.png'
import dude2 from './images/dude2.png'
import dude3 from './images/dude3.png'
import dude4 from './images/dude4.png'
import kim from './images/kim-gh.png'

const styles = {
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	inputContainer: {
		display: 'flex',
		backgroundColor: 'black',
	},
	top: {
		flex: 1,
	},
}

export default class rightBar extends Component {
	render() {
		return (
			<div style={styles.container}>
				<div style={styles.top}>
					<ListHeader text={'MAINTAINERS'} />
					<UserRow image={dev} text={'dabbott'} />
					<UserRow image={kim} text={'kialvare'} />
					<ListHeader text={'CONTRIBUTORS'} />
					<UserRow image={dude1} text={'chucknorris'} />
					<UserRow image={dude2} text={'bobross'} />
					<UserRow image={dude3} text={'thatoneguy'} />
					<UserRow image={dude4} text={'supermario'} />
					<ListHeader text={'DROPDOWN MENU'} />
					<MessageRow image={dev} user={'dabbott'} text={'hi'} />
					<MessageRow image={kim} user={'kialvare'} text={'how you doin'} />
				</div>
				<div style={styles.inputContainer}>
					<InputField />
				</div>
			</div>
		);
	}
}
