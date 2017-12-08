/*global chrome*/

import React, { Component } from 'react';
import Header from 'containers/Header';
import ChromeApiReq from 'services/ChromeApiReq'
import NewBookmark from "components/NewBookmark";
import SavedBookmarks from "components/SavedBookmarks"
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUrl: "", savedBookmarks: [] };
  }

  getUrl() {
    ChromeApiReq.getCurrentTabUrl().then((url) => {
      this.setState({ currentUrl: url })
    });
  };

  showBookmarks() {
    ChromeApiReq.getSavedBookmarks().then((bookmarks) => {
      this.setState({ savedBookmarks: bookmarks});
      console.log("RUNNING SHOWBOOKMARKS IN APP.jS");
      console.log(bookmarks)
    })
  }

  componentDidMount() {
    this.getUrl();
    this.showBookmarks();
  }

  render() {
    return (
      <div className="App">
        <Header />
          <NewBookmark url={this.state.currentUrl}/>
          <SavedBookmarks savedBookmarks={this.state.savedBookmarks}/>
      </div>
    );
  }
}

export default App;
