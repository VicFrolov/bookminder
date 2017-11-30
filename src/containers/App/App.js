/*global chrome*/

import React, { Component } from 'react';
import Header from 'containers/Header';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUrl: ""};
  }

  getCurrentTabUrl() {
    const queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
      const tab = tabs[0];
      const url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
      this.setState({ currentUrl: url });
    });
  };

  componentDidMount() {
    this.getCurrentTabUrl();
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
