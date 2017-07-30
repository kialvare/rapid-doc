import React, { Component } from 'react';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import NavigationTitle from './NavigationTitle';
import SearchField from './SearchField';

export default class Navigation extends Component {
  static defaultProps = {
    onChangePage: () => { },
  }

  handleLinkClick = (id) => {
    const { onChangePage } = this.props;

    onChangePage(id)
  }

  renderItem = (page) => {
    const { currentPageId } = this.props;
    const { id, title, isGroup } = page;

    if (isGroup) {
      return (
        <ListHeader key={id} text={title.toUpperCase()} />
      )
    } else {
      return (
        <ListItem
          key={id}
          onClick={() => this.handleLinkClick(id)}
          text={title}
          selected={id === currentPageId}
        />
      )
    }
  }

  render() {
    const { pages } = this.props;

    return (
      <div>
        <NavigationTitle text={'rapid.io'} />
        <SearchField />
        {pages.map(this.renderItem)}
      </div>
    );
  }
}
