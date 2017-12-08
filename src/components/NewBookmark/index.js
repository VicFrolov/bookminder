import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ChromeApiReq from 'services/ChromeApiReq';
import './style.css';


class NewBookmark extends Component {

  constructor(props) {
    super(props);
    this.saveBookmark = this.saveBookmark.bind(this);
  }

  getDomain(url) {
    console.log(`this is the url ${url}`);
    let domain = "";
    if (url && !url.includes('.')) {
      domain = url;
    } else if ((url.match(/./g) || []).length >= 2) {
      console.log('seeecondddd');
      domain = `${url.split('.')[0]}.com`;
    } else {
      console.log('thiiiiiird');
      domain = `${url.split('.')[0]}.com}`;
    }

    return domain
  }

  saveBookmark() {
    const bookmarkObj = {};
    bookmarkObj.url = this.props.url;
    bookmarkObj.timestamp = new Date();
    bookmarkObj.domain = this.getDomain(this.props.url);

    ChromeApiReq.saveBookmark(bookmarkObj).then((result) => {
      console.log(result);
    })
  }

  render() {
    return (
      <div>
        <h1 className="section-header"> New Bookmark</h1>
        <p>Save: {this.getDomain(this.props.url)} </p>
        <span>Alert me in </span>
        <select id="dropdown">
          <option selected value="1">24 Hours</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
          <option value="14">2 Weeks</option>
          <option value="30">1 Month</option>
          <option value="never">Never</option>
        </select>

        <Button bsStyle="primary" onClick={this.saveBookmark}>Primary</Button>
      </div>
    );
  }
}

export default NewBookmark;
