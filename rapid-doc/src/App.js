import React, { Component } from 'react';
import './App.css';

import ListItem from './ListItem'
import ListHeader from './ListHeader'
import NavigationTitle from './NavigationTitle'
import ContentTitle from './ContentTitle'
import ContentSubtitle from './ContentSubtitle'
import UserRow from './UserRow.js'
import Contributers from './AvatarRow.js'
import MessageRow from './MessageRow.js'

import dev from './images/dev-gh.png'
import kim from './images/kim-gh.png'
import dude1 from './images/dude1.png'
import dude2 from './images/dude2.png'
import dude3 from './images/dude3.png'
import dude4 from './images/dude4.png'
import dude5 from './images/dude5.png'
import dude6 from './images/dude6.png'

const styles = {
	container: {
		width: '100%',
		height: '100%',
		display: 'flex',
	},
	navigation: {
		width: 284,
		borderRight: '1px solid #EAEAEA',
	},
	content: {
		paddingTop: 80,
		paddingLeft: 100,
		flex: 1,
	},
	chat: {
		width: 340,
		borderLeft: '1px solid #EAEAEA',
	},
	contributers: {
		display: 'flex',
		alignItems: 'left',
	},
}

class App extends Component {
	render() {
	return (
		<div style={styles.container}>
			<div style={styles.navigation}>
				<NavigationTitle text={'React Express'} />
				<ListHeader text={'SETUP'} />
				<ListItem text={'Environment'} />
				<ListItem text={'Getting Started'} selected />
				<ListItem text={'Build Tools'} />
				<ListHeader text={'LANGUAGE'} />
				<ListItem text={'Modern JavaScript'} />
				<ListItem text={'ES2015'} />
				<ListItem text={'ES2016'} />
				<ListItem text={'JSX'} />
				<ListHeader text={'REACT'} />
				<ListItem text={'Top-Level API'} />
				<ListItem text={'React Components'} />
				<ListItem text={'Component API'} />
				<ListItem text={'LifeCycle API'} />
			</div>
			<div style={styles.content}>
				<ContentTitle text={'Getting Started'} />
				<ContentSubtitle text={'How to Set Up'} />
				<Contributers style={styles.contributers} users={[dude1, dude5, dude6]} />
			</div>
			<div style={styles.chat}>
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
		</div>
    );
  }
}

export default App;
