import './App.css';

import React, { Component } from 'react';

import Navigation from './Navigation'
import Page from './Page';
import RightBar from './RightBar.js'
import client from './rapid/client'

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
		paddingBottom: 80,
		paddingLeft: 80,
		paddingRight: 80,
		overflowY: 'auto',
		flex: 1,
	},
	chat: {
		display: 'flex',
		width: 340,
		borderLeft: '1px solid #EAEAEA',
	},
}

class App extends Component {

	constructor() {
		super()

		this.state = {
			pages: [],
			suggestionsById: {},
			currentPageId: 'initializing-client',
		}

		this.pageSubscription = client
			.collection('pages')
			.subscribe(pages => {
				// Theres only one pages object
				this.setState({ pages: pages[0].body.pages })
			})

		this.suggestions = client
			.collection('suggestions')
			.subscribe(suggestions => {
				const suggestionsById = suggestions.reduce((acc, suggestion) => {
					const { body: { blockId } } = suggestion;

					if (!acc[blockId]) {
						acc[blockId] = []
					}

					acc[blockId].push(suggestion)

					return acc;
				}, {})

				this.setState({ suggestionsById })
			})
	}

	componentWillUnmount() {
		this.pageSubscription.unsubscribe()
		this.suggestions.unsubscribe()
	}

	handleChangePage = (id) => {
		this.setState({ currentPageId: id })
	}

	render() {
		const { pages, currentPageId, suggestionsById } = this.state;

		const currentPage = pages.find(page => page.id === currentPageId);

		return (
			<div style={styles.container}>
				<div style={styles.navigation}>
					<Navigation
						pages={pages}
						currentPageId={currentPageId}
						onChangePage={this.handleChangePage}
					/>
				</div>
				<div style={styles.content}>
					<Page
						key={currentPageId}
						title={currentPage ? currentPage.title : "Initializing Client"}
						id={currentPageId}
						suggestionsById={suggestionsById}
					/>
				</div>
				<div style={styles.chat}>
					<RightBar />
				</div>
			</div>
		);
	}
}

export default App;
