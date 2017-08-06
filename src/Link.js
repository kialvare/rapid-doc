import React, { Component } from 'react';

const styles = {
  link: {
    fontSize: 16,
    color: '#46A6FF',
    display: 'inline-block',
    cursor: 'pointer',
  },
  error: {
    color: '#FF001F',
  },
}

export default class Link extends Component {
  render() {
    const { text, onClick, type } = this.props

    const style = {
      ...styles.link,
      ...(type === 'error' ? styles.error : {}),
    }

    return (
      <div
        style={style}
        onClick={onClick}
      >
        {text}
      </div>
    );
  }
}
