self.importScripts("lib.js");

const menu = {
  id: `english-vocabulary-book-add-word-menu`,
  title: `Add to my vocabulary book`,
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
