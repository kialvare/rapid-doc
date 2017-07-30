import React, { Component } from 'react';

export default class Spacer extends Component {
  render() {
    const { size, horizontal = false } = this.props

    const style = {
      width: horizontal ? size : 0,
      height: horizontal ? 0 : size,
    }

    return (
      <div style={style} />
    );
  }
}
