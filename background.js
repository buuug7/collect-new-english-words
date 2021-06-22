const menuId = `my_new_words_book_add_menu`
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Add to my new words book',
    id: menuId,
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(function (itemData) {
  if (itemData.menuItemId === menuId) {
    console.log(itemData)
    chrome.storage.sync.get('newWords', data => {
      console.log('newWords', data)
      let newWords = data['newWords']
      if (!newWords) {
        newWords = []
      }

      const selectionText = itemData.selectionText
      if (selectionText) {
        newWords.push(selectionText.trim())
        chrome.storage.sync.set({
          'newWords': newWords,
        })
      }
    })
  }
})
