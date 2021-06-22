self.importScripts("lib.js");

const menuId = `my_new_words_book_add_menu`;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Add to my words book",
    id: menuId,
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (itemData) {
  if (itemData.menuItemId === menuId) {
    console.log(itemData);
    getWords().then((words) => {
      const selectionText = itemData.selectionText;
      addWord(selectionText, words).then((r) => console.log(r));
    });
  }
});
