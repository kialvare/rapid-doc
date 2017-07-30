import React, { Component } from 'react';

import { currentUser, userByName } from './User';
import ContentTitle from './ContentTitle'
import Contributers from './AvatarRow.js'
import EditableBlock from './EditableBlock';
import Link from './Link';
import Spacer from './Spacer';
import client from './rapid/client'
import dev from './images/dev-gh.png'
import kim from './images/kim-gh.png'

const styles = {
  container: {

  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    marginBottom: 4,
  },
  addSectionContainer: {
    padding: 20,
  }
}

class Page extends Component {

  constructor(props) {
    super()

    const { id } = props

    this.state = {
      blocks: [],
      activeBlockId: null,
      isEditing: false,
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

  handleBlockDelete = (id) => {
    console.log('handle block delete', id)

    client
      .collection('blocks')
      .document(id)
      .delete()
  }

  handleBlockStartEditing = (id) => {
    this.setState({
      activeBlockId: id,
    })

    client
      .collection('blocks')
      .document(id)
      .merge({
        activeUserId: currentUser.username,
      });
  }

  handleBlockCommitEditing = (id) => {
    this.setState({
      activeBlockId: null,
    })

    client
      .collection('blocks')
      .document(id)
      .merge({
        activeUserId: null,
      });
  }

  handlePageStartEditing = () => {
    this.setState({ isEditing: true })
  }

  handlePageCommitEditing = () => {
    this.setState({ isEditing: false })
  }

  renderBlock = (block) => {
    const { activeBlockId, isEditing } = this.state;
    const { id, body: { content, activeUserId } } = block;

    const activeUser = (
      activeUserId !== currentUser.username &&
      activeUserId &&
      userByName[activeUserId]
    )

    return (
      <EditableBlock
        key={id}
        activeUser={activeUser}
        showEditingTools={isEditing}
        isEditing={id === activeBlockId}
        content={content}
        onChange={(newContent) => this.handleBlockChange(id, newContent)}
        onClickEdit={() => this.handleBlockStartEditing(id)}
        onClickDone={() => this.handleBlockCommitEditing(id)}
        onClickDelete={() => this.handleBlockDelete(id)}
      />
    )
  }

  renderEditLink() {
    const { isEditing } = this.state;

    if (isEditing) {
      return (
        <Link text={'Done'} onClick={this.handlePageCommitEditing} />
      )
    }

    return <Link text={'Edit'} onClick={this.handlePageStartEditing} />
  }

  render() {
    const { title } = this.props;
    const { blocks, isEditing } = this.state;

    return (
      <div className={'page'} style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <ContentTitle text={title} />
            <Spacer size={4} />
            {this.renderEditLink()}
          </div>
          <Contributers users={[dev, kim]} />
        </div>
        {blocks.map(this.renderBlock).reduce((acc, block, i, list) => {
          acc.push(block)

          if (isEditing && i !== list.length - 1) {
            acc.push(<Spacer key={'spacer' + i} size={20} />)
          }

          return acc;
        }, [])}
        {isEditing && (
          <div style={styles.addSectionContainer}>
            <Link
              text={'Add section'}
              onClick={this.handleCreateBlock}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Page;
