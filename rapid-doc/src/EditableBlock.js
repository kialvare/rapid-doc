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

  handleChange = (event) => {
    const { onChange } = this.props

    onChange(event.target.value)
  }

  renderEditable() {
    const { content, onClickDone } = this.props

    return (
      <div>
        <div>
          <textarea
            value={content}
            onChange={this.handleChange}
          />
        </div>
        <Link
          text={'Done'}
          onClick={onClickDone}
        />
      </div>
    )
  }

  renderReadOnly() {
    const { content, onClickEdit, onChange } = this.props

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
    const { content, isEditing } = this.props

    return (
      <div style={styles.container}>
        {isEditing ? this.renderEditable() : this.renderReadOnly()}
      </div>
    );
  }
}
