import React, { Component } from 'react';

const styles = {
	container: {
		display: 'flex',
		alignItems: 'center',
	},

}

export default class InputField extends Component {
	render() {
		return (
			<input type={'text'} placeholder={'Type a message...'}/>
		);
	}
}
