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
	state = {value: ''};

	handleChange = (e) => {
		this.setState({value: e.target.value});
	}

	_handleKeyPress = (e) => {
		const { onSubmit } = this.props
		if (e.key === 'Enter') {
			this.setState({value: ''});
			onSubmit(e.target.value);
			console.log("do validate");
		}
	}

	render() {
		return (
			<div style={styles.container}>
				<input value={this.state.value} onChange={this.handleChange}  type={'text'} style={styles.input} placeholder={'Type a message...'} onKeyPress={this._handleKeyPress}/>
			</div>
		);
	}
}
