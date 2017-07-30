import React, { Component } from 'react';

export default class Spacer extends Component {
  render() {
    const { size = 0, horizontal = false, flex = false } = this.props

    const style = {
      width: horizontal ? size : 0,
      height: horizontal ? 0 : size,
    }

    const flexStyle = {
      flex: 1,
    }

    return (
      <div style={flex ? flexStyle : style} />
    );
  }
}
