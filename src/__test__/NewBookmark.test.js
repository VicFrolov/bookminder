const NewBookmark = require('components/NewBookmark/index.js');

class NewBookmarkTestHarness {
  static testUrlParse() {
    NewBookmark.parseUrl('www.google.com');
  }
}

NewBookmarkTestHarness.testUrlParse();