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
  textareaContainer: {
    display: 'flex',
    minHeight: 250,
  },
  textarea: {
    flex: 1,
    padding: 10,
    border: '4px solid #46A6FF',
    fontFamily: 'Monaco, monospace',
    fontSize: 14,
  },
  editingTools: {
    display: 'flex',
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
        <div style={styles.textareaContainer}>
          <textarea
            style={styles.textarea}
            value={pendingContent}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Spacer size={20} />
          <div style={styles.editingTools}>
            <Link
              text={'Done'}
              onClick={this.handleDone}
            />
            <Spacer flex />
            <Link
              text={'Revert Changes'}
              type={'error'}
            />
          </div>
        </div>
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
            <div style={styles.editingTools}>
              <Link
                text={'Edit'}
                onClick={onClickEdit}
              />
              <Spacer flex />
              <Link
                text={'Delete'}
                type={'error'}
              />
            </div>
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
