import React, { Component } from 'react';

import Link from './Link';
import Marked from './markdown/Marked';

const styles = {
  container: {
    backgroundColor: '#F8F8F8',
  },
}

export default class ContentTitle extends Component {

  static defaultProps = {
    onClickEdit: () => { },
    onClickDone: () => { },
    onChange: () => { },
  }

  state = {
    pendingContent: this.props.content,
  }

  handleChange = (event) => {
    const { onChange } = this.props

    this.setState({
      pendingContent: event.target.value,
    })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({
        pendingContent: nextProps.content,
      })
    }
  }

  handleDone = () => {
    const { pendingContent } = this.state
    const { onChange, onClickDone } = this.props

    onClickDone()
    onChange(pendingContent)
  }

  renderEditable() {
    const { pendingContent } = this.state

    return (
      <div>
        <div>
          <textarea
            value={pendingContent}
            onChange={this.handleChange}
          />
        </div>
        <Link
          text={'Done'}
          onClick={this.handleDone}
        />
      </div>
    )
  }

  renderReadOnly() {
    const { content, onClickEdit } = this.props

    return (
      <div>
        <Marked>
          {content}
        </Marked>
        <Link
          text={'Edit'}
          onClick={onClickEdit}
        />
      </div>
    )
  }

  render() {
    const { isEditing } = this.props

    return (
      <div style={styles.container}>
        {isEditing ? this.renderEditable() : this.renderReadOnly()}
      </div>
    );
  }
}
