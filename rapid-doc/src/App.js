import React, { Component } from 'react';
import './App.css';

import ListItem from './ListItem'
import ListHeader from './ListHeader'
import NavigationTitle from './NavigationTitle'
import ContentTitle from './ContentTitle'
import ContentSubtitle from './ContentSubtitle'
import UserRow from './UserRow.js'

import dev from './images/dev-gh.png'

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
	main: {
		width: 810,
	},
	maincontent: {
		marginTop: 80,
		marginLeft: 100,
		width: 609,
	},
	content: {
		flex: 1,
	},
	chat: {
		width: 340,
		borderLeft: '1px solid #EAEAEA',
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
			<div style={styles.main}>
				<div style={styles.maincontent}>
					<ContentTitle text={'Getting Started'} />
					<br />
					<ContentSubtitle text={'How to Set Up'} />
				</div>
			</div>
			<div style={styles.chat}>
				<ListHeader text={'MAINTAINERS'} />
				<UserRow image={dev} text={'dabbott'} />
			</div>
		</div>
    );
  }
}

export default App;
