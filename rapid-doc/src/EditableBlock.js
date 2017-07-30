import React, { Component } from 'react';

import { userByName } from './User';
import Avatar from './Avatar';
import Link from './Link';
import Marked from './markdown/Marked';
import SeparatorDot from './SeparatorDot';
import Spacer from './Spacer';
import client from './rapid/client';

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
    alignItems: 'center',
  },
  activeUserRow: {
    display: 'flex',
    alignItems: 'center',
  },
  activeUserLabel: {
    fontSize: 16,
    fontWeight: 300,
    color: '#979797',
    display: 'flex',
    alignItems: 'center',
  },
  suggestionsText: {
    fontSize: 16,
    fontWeight: 300,
    color: '#979797',
  }
}

export default class ContentTitle extends Component {

  static defaultProps = {
    onClickEdit: () => { },
    onClickDone: () => { },
    onChange: () => { },
  }

  state = {
    pendingContent: null,
    isSuggesting: false,
    showSuggestions: false,
  }

  handleChange = (event) => {
    const { onChange } = this.props
    const { isSuggesting } = this.state

    this.setState({
      pendingContent: event.target.value,
    })

    if (isSuggesting) return;

    onChange(event.target.value);
  }

  componentWillUpdate(nextProps) {
    const { pendingContent } = this.state

    if (
      nextProps.content !== this.props.content &&
      pendingContent === null
    ) {
      this.setState({
        pendingContent: nextProps.content,
      })
    }
  }

  handleClickEdit = () => {
    const { content, onClickEdit } = this.props

    this.setState({
      pendingContent: content,
    })

    onClickEdit();
  }

  handleClickMakeSuggestion = () => {
    const { content } = this.props

    this.setState({
      pendingContent: content,
      isSuggesting: true,
    })
  }

  handleDone = () => {
    const { pendingContent } = this.state
    const { onChange, onClickDone } = this.props

    this.setState({
      pendingContent: null,
    })

    onClickDone()
    onChange(pendingContent)
  }

  handleSubmitSuggestion = () => {
    const { pendingContent } = this.state
    const { onChange, onClickSubmitSuggestion } = this.props

    this.setState({
      pendingContent: null,
      isSuggesting: false,
    })

    onClickSubmitSuggestion(pendingContent)
  }

  renderSuggestion = (suggestion) => {
    const { onChange, showEditingTools } = this.props

    const { id, body: { content, authorId } } = suggestion

    return (
      <div>
        <div style={{
          borderRadius: 4,
          backgroundColor: 'rgb(245,245,245)',
          padding: 20,
          marginTop: 10,
          marginBottom: 30,
          ...(showEditingTools ? { border: '1px solid #cacaca', padding: 19 } : {})
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar image={userByName[authorId] && userByName[authorId].image} />
            <Spacer horizontal size={6} />
            <div style={styles.activeUserLabel}>
              Suggestion by {authorId}
            </div>
          </div>
          <div style={{
            margin: '20px 0',
            height: 1,
            backgroundColor: '#cacaca',
          }} />
          <Marked>
            {content}
          </Marked>
          <div style={styles.editingTools}>
            <Link
              text={'Accept Suggestion'}
              onClick={() => {
                onChange(content)
                client
                  .collection('suggestions')
                  .document(id)
                  .delete()
              }}
            />
            <Spacer flex />
            <Link
              text={'Delete Suggestion'}
              type={'error'}
              onClick={() => {
                client
                  .collection('suggestions')
                  .document(id)
                  .delete()
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  renderSuggestions = () => {
    const { suggestions, activeUser } = this.props
    const { showSuggestions } = this.state

    if (suggestions.length === 0) return null;

    const link = (
      <Link
        text={showSuggestions ? 'Hide' : 'Show'}
        onClick={() => this.setState({ showSuggestions: !showSuggestions })}
      />
    )

    return (
      <div style={styles.suggestionsText}>
        {activeUser && <Spacer size={20} />}
        {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} ({link})
        <Spacer size={20} />
        {showSuggestions && (
          <div>
            {suggestions.map(this.renderSuggestion)}
          </div>
        )}
      </div>
    )
  }

  renderEditable() {
    const { pendingContent, isSuggesting } = this.state

    return (
      <div>
        <div style={styles.textareaContainer}>
          <textarea
            style={styles.textarea}
            value={pendingContent}
            onChange={this.handleChange}
          />
        </div>
        {this.renderSuggestions()}
        <div>
          <Spacer size={20} />
          <div style={styles.editingTools}>
            <Link
              text={isSuggesting ? 'Submit Suggestion' : 'Done'}
              onClick={isSuggesting ? this.handleSubmitSuggestion : this.handleDone}
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
    const { content, showEditingTools, onClickDelete, activeUser } = this.props

    return (
      <div>
        <Marked>
          {content}
        </Marked>
        {activeUser && (
          <div>
            <Spacer size={20} />
            <div style={styles.activeUserRow}>
              <Avatar image={activeUser.image} />
              <Spacer size={6} horizontal />
              <div style={styles.activeUserLabel}>
                {activeUser.username} currently editing...
              </div>
            </div>
          </div>
        )}
        {this.renderSuggestions()}
        {showEditingTools && (
          <div>
            <Spacer size={20} />
            <div style={styles.divider} />
            <Spacer size={20} />
            <div style={styles.editingTools}>
              <Link
                text={'Edit'}
                onClick={this.handleClickEdit}
              />
              <SeparatorDot />
              <Link
                text={'Make Suggestion'}
                onClick={this.handleClickMakeSuggestion}
              />
              <Spacer flex />
              <Link
                text={'Delete'}
                type={'error'}
                onClick={onClickDelete}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    const { isEditing, showEditingTools } = this.props
    const { isSuggesting } = this.state

    const style = {
      ...styles.container,
      ...(showEditingTools ? styles.containerEditable : {}),
    }

    return (
      <div style={style}>
        {isEditing || isSuggesting ? this.renderEditable() : this.renderReadOnly()}
      </div>
    );
  }
}
