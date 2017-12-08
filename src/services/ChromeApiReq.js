/*global chrome*/

class ChromeApiReq {

  static getSavedBookmarks() {
    const bookmarkKey = "bookmarks";
    return new Promise((resolve, reject) => {
      window.chrome.storage.sync.get(bookmarkKey, (items) => {
        resolve(chrome.runtime.lastError ? null : items[bookmarkKey]);
      });
    });
  }

  static getCurrentTabUrl() {
    const queryInfo = {
      active: true,
      currentWindow: true
    };

    return new Promise((resolve, reject) => {
      window.chrome.tabs.query(queryInfo, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
        console.assert(typeof url === 'string', 'tab.url should be a string');
        resolve(url);
      });
    });
  }

  static saveBookmark(bookmarkObj) {
    return new Promise((resolve, reject) => {
      this.getSavedBookmarks().then((bookmarks) => {
        if (!bookmarks) {
          bookmarks = [];
        }
        bookmarks.push(bookmarkObj);
        window.chrome.storage.sync.set({"bookmarks": bookmarks});
        resolve(bookmarks);
      });
    });
  }

}

export default ChromeApiReq;
