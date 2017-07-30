import React, { Component } from 'react';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import NavigationTitle from './NavigationTitle';
import client from './rapid/client';

const styles = {

}

export default class Navigation extends Component {

  constructor() {
    super()

    this.state = {
      pages: [],
    }

    this.subscription = client
      .collection('pages')
      .subscribe(pages => {
        // Theres only one pages object
        this.setState({ pages: pages[0].body.pages })
      })
  }

  renderItem = (page) => {
    const { id, title, isGroup } = page

    if (isGroup) {
      return (
        <ListHeader text={title} />
      )
    } else {
      return (
        <ListItem text={title} />
      )
    }
  }

  render() {
    const { pages } = this.state;

    return (
      <div>
        <NavigationTitle text={'rapid.io'} />
        {pages.map(this.renderItem)}
      </div>
    );
  }
}
