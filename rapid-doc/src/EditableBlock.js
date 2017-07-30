import React, { Component } from 'react';

import Link from './Link';
import Marked from './markdown/Marked';
import Spacer from './Spacer';

const styles = {
  container: {
    borderRadius: 4,
    padding: 20,
  },
  containerEditable: {
    backgroundColor: '#F0F8FF',
    border: '1px solid #46A6FF',
    padding: 19,
  },
  divider: {
    height: 1,
    backgroundColor: '#46A6FF',
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
    const { content, onClickEdit, showEditingTools } = this.props

    return (
      <div>
        <Marked>
          {content}
        </Marked>
        {showEditingTools && (
          <div>
            <Spacer size={20} />
            <div style={styles.divider} />
            <Spacer size={20} />
            <Link
              text={'Edit'}
              onClick={onClickEdit}
            />
          </div>
        )}
      </div>
    )
  }

  render() {
    const { isEditing, showEditingTools } = this.props

    const style = {
      ...styles.container,
      ...(showEditingTools ? styles.containerEditable : {}),
    }

    return (
      <div style={style}>
        {isEditing ? this.renderEditable() : this.renderReadOnly()}
      </div>
    );
  }
}
