import './App.css';

import React, { Component } from 'react';

import Navigation from './Navigation'
import ContentSubtitle from './ContentSubtitle'
import ContentTitle from './ContentTitle'
import Contributers from './AvatarRow.js'
import EditableBlock from './EditableBlock';
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import MessageRow from './MessageRow.js'
import NavigationTitle from './NavigationTitle'
import UserRow from './UserRow.js'
import Contributers from './AvatarRow.js'
import MessageRow from './MessageRow.js'
import InputField from './InputField.js'
import client from './rapid/client'
import dev from './images/dev-gh.png'
import dude1 from './images/dude1.png'
import dude2 from './images/dude2.png'
import dude3 from './images/dude3.png'
import dude4 from './images/dude4.png'
import dude5 from './images/dude5.png'
import dude6 from './images/dude6.png'
import kim from './images/kim-gh.png'

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
		paddingRight: 100,
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
	headerRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}

class App extends Component {

	constructor() {
		super()

		this.state = {
			blocks: [],
			activeBlockId: null,
		}

		this.subscription = client
			.collection('blocks')
			.subscribe(blocks => {
				this.setState({ blocks })
			})

		this.handleCreateBlock = this.handleCreateBlock.bind(this);
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
	}

	async handleCreateBlock() {
		console.log('Creating block...')

		try {
			const success = await client
				.collection('blocks')
				.newDocument()
				.mutate({
					content: 'Edit me!',
				})
			console.log('Created block', success)
		} catch (e) {
			console.log('Error creating block', e)
		}
	}

	handleBlockStartEditing = (id) => {
		this.setState({
			activeBlockId: id,
		})
	}

	handleBlockEndEditing = (id) => {
		this.setState({
			activeBlockId: null,
		})
	}

	handleBlockChange = (id, content) => {
		console.log('handle block change', id, content)

		client
			.collection('blocks')
			.document(id)
			.mutate({ content });
	}

	render() {
		const { blocks, activeBlockId } = this.state;

		return (
			<div style={styles.container}>
				<div style={styles.navigation}>
					<Navigation />
				</div>
				<div style={styles.content}>
					<div style={styles.headerRow}>
						<ContentTitle text={'Getting Started'} />
						<Contributers style={styles.contributers} users={[dude1, dude5, dude6]} />
					</div>
					{
						blocks.map(block => {
							const { id, body: { content } } = block;

							return (
								<EditableBlock
									key={id}
									isEditing={id === activeBlockId}
									content={content}
									onChange={(newContent) => this.handleBlockChange(id, newContent)}
									onClickEdit={() => this.handleBlockStartEditing(id)}
									onClickDone={() => this.handleBlockEndEditing(id)}
								/>
							)
						})
					}
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
					<InputField />
				</div>
			</div>
		);
	}
}

export default App;
