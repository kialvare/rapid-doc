import React, { Component } from 'react';

const styles = {
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
	},
	input: {
		display: 'flex',
		flex: 1,
		outline: 0,
		borderLeft: '1px solid #EAEAEA',
		borderTop: '1px solid #EAEAEA',
		borderRight: 0,
		borderBottom: 0,
		fontFamily: 'Raleway',
		height: 50,
	},
}

export default class InputField extends Component {
	_handleKeyPress = (e) => {
		const { onSubmit } = this.props
		if (e.key === 'Enter') {
			onSubmit(e.target.value);
			console.log("do validate");
		}
	}

	render() {
		return (
			<div style={styles.container}>
				<input type={'text'} style={styles.input} placeholder={'Type a message...'} onKeyPress={this._handleKeyPress}/>
			</div>
		);
	}
}
