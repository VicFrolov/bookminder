import React, { Component } from 'react';

import './style.css';


class SavedBookmarks extends Component {

  loadBookmarks() {
    console.log("PRINTING SAVED BOOKMARKS");
    const bmList = this.props.savedBookmarks.map((bmObject) => {
      return <li>{bmObject.attackAt}</li>
    });

    return bmList;
  }
  render() {
    return (
      <div>
        <h1 className="section-header">Saved Bookmarks</h1>
        <ul>
          {this.loadBookmarks()}
        </ul>
      </div>
    );
  }
}

export default SavedBookmarks;
