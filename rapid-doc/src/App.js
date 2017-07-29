import React, { Component } from 'react';
import './App.css';

import ListItem from './ListItem'
import ListHeader from './ListHeader'
import NavigationTitle from './NavigationTitle'

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
				<ListItem text={'Environment'} selected/>
				<ListItem text={'Getting Started'} />
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
			<div style={styles.
		</div>
    );
  }
}

export default App;
