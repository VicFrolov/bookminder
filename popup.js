(function() {
  'use strict'

  const getCurrentTabUrl = (callback) => {
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];
      var url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
      callback(url);
    });
  };

  const changeBackgroundColor = (color) => {
    var script = `document.body.style.backgroundColor="${color}";`;
    chrome.tabs.executeScript({
      code: script
    });
  };

  const getSavedBackgroundColor = (url, callback) => {
    chrome.storage.sync.get(url, (items) => {
      callback(chrome.runtime.lastError ? null : items[url]);
    });
  };

  /**
   * Sets the given background color for url.
   *
   * @param {string} url URL for which background color is to be saved.
   * @param {string} color The background color to be saved.
   */
  function saveBackgroundColor(url, color) {
    var items = {};
    items[url] = color;
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
    // optional callback since we don't need to perform any action once the
    // background color is saved.
    chrome.storage.sync.set(items);
  }

  // This extension loads the saved background color for the current tab if one
  // exists. The user can select a new background color from the dropdown for the
  // current page, and it will be saved as part of the extension's isolated
  // storage. The chrome.storage API is used for this purpose. This is different
  // from the window.localStorage API, which is synchronous and stores data bound
  // to a document's origin. Also, using chrome.storage.sync instead of
  // chrome.storage.local allows the extension data to be synced across multiple
  // user devices.
  document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
      var dropdown = $('#dropdown');
      getSavedBackgroundColor(url, (savedColor) => {
        if (savedColor) {
          changeBackgroundColor(savedColor);
          dropdown.val(savedColor);
        }
      });

      // Ensure the background color is changed and saved when the dropdown
      // selection changes.
      dropdown.change(() => {
        console.log("running change!");
        changeBackgroundColor(dropdown.val());
        saveBackgroundColor(url, dropdown.val());
      });
    });
  });
}());