self.importScripts("lib.js");

const menu = {
  id: `my_new_words_book_add_menu`,
  title: `Add to my words book(dev)`,
};

init().then(() => {});

async function init() {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      ...menu,
      contexts: ["selection"],
    });
  });

  chrome.contextMenus.onClicked.addListener(async (itemData) => {
    console.log(itemData);
    if (itemData.menuItemId !== menu.id) {
      return;
    }
    const words = await getWords();
    const selectionText = itemData.selectionText;
    await addWord(selectionText, words);
  });

  await disablePopupBehavior();
}

async function disablePopupBehavior() {
  await chrome.action.setPopup({ popup: "" });
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "book.html" });
  });
}
