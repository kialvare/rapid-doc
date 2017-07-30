import React, { Component } from 'react';

const styles = {
  dot: {
    height: 6,
    width: 6,
    backgroundColor: '#45A6FF',
    borderRadius: '50%',
    margin: '0 10px',
  },
}

export default class SeparatorDot extends Component {
  render() {
    return (
      <div style={styles.dot} />
    );
  }
}
