/*global chrome*/

import React, { Component } from 'react';
import Header from 'containers/Header';
import ChromeApiReq from 'services/ChromeApiReq'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUrl: ""};
  }

  getUrl() {
    ChromeApiReq.getCurrentTabUrl().then((url) => {
      this.setState({ currentUrl: url })
    });
  };

  showBookmarks() {
    ChromeApiReq.getSavedBookmarks().then((bookmarks) => {
      console.log("I'm running!!!");
      console.log(bookmarks)
    })
  }

  componentDidMount() {
    this.getUrl();
    this.showBookmarks();
    ChromeApiReq.saveBookmark({"attackAt": "dawn"}).then((result) => {
      console.log(result);
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
          <h1>{ this.state.currentUrl }</h1>
          <span>Choose a color </span>
          <select id="dropdown">
              <option selected disabled hidden value=''/>
              <option value="white">White</option>
              <option value="pink">Pink</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
          </select>
      </div>
    );
  }
}

export default App;
