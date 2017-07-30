import React, { Component } from 'react';

import ContentTitle from './ContentTitle'
import Contributers from './AvatarRow.js'
import EditableBlock from './EditableBlock';
import Link from './Link';
import client from './rapid/client'
import dude1 from './images/dude1.png'
import dude5 from './images/dude5.png'
import dude6 from './images/dude6.png'

const styles = {
  container: {

  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

class Page extends Component {

  constructor(props) {
    super()

    const { id } = props

    this.state = {
      blocks: [],
      activeBlockId: null,
    }

    this.subscription = client
      .collection('blocks')
      .filter({ pageId: id })
      .subscribe(blocks => {
        this.setState({ blocks })
      })

    this.handleCreateBlock = this.handleCreateBlock.bind(this);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  async handleCreateBlock() {
    const { id } = this.props;

    console.log('Creating block...')

    try {
      const success = await client
        .collection('blocks')
        .newDocument()
        .mutate({
          content: 'Edit me!',
          pageId: id,
        })
      console.log('Created block', success)
    } catch (e) {
      console.log('Error creating block', e)
    }
  }

  handleBlockChange = (id, content) => {
    console.log('handle block change', id, content)

    client
      .collection('blocks')
      .document(id)
      .merge({ content });
  }

  handleBlockStartEditing = (id) => {
    this.setState({
      activeBlockId: id,
    })
  }

  handleBlockEndEditing = (id) => {
    this.setState({
      activeBlockId: null,
    })
  }

  renderBlock = (block) => {
    const { activeBlockId } = this.state;
    const { id, body: { content } } = block;

    return (
      <EditableBlock
        key={id}
        isEditing={id === activeBlockId}
        content={content}
        onChange={(newContent) => this.handleBlockChange(id, newContent)}
        onClickEdit={() => this.handleBlockStartEditing(id)}
        onClickDone={() => this.handleBlockEndEditing(id)}
      />
    )
  }

  render() {
    const { blocks } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <ContentTitle text={'Getting Started'} />
          <Contributers users={[dude1, dude5, dude6]} />
        </div>
        {blocks.map(this.renderBlock)}
        <Link text={'Add section'} onClick={this.handleCreateBlock} />
      </div>
    );
  }
}

export default Page;
