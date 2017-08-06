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
    borderBottom: '1px solid #EBEBEB',
    borderTop: '1px solid #EBEBEB',
    borderRight: 0,
    borderLeft: 0,
    paddingLeft: 30,
    backgroundColor: '#F9F9F9',
    height: 50,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 300,
  },
}

export default class InputField extends Component {
  render() {
    return (
      <div style={styles.container}>
        <input
          type={'text'}
          style={styles.input}
          placeholder={'Search...'}
        />
      </div>
    );
  }
}
