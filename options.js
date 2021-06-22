const wordsDom = document.querySelector('#words')

let newWords

function handleWordClick (text) {
  const _confirm = window.confirm('Did really want to delete this word?')

  if (!_confirm) {
    return
  }

  newWords = newWords.filter(it => it !== text)
  chrome.storage.sync.set({
    'newWords': newWords,
  }, () => {
    location.reload()
  })
}

chrome.storage.sync.get('newWords', (data) => {
  newWords = data['newWords'] || []

  for (let word of newWords) {
    let span = document.createElement('span')
    span.textContent = word
    span.addEventListener('click', handleWordClick)

    wordsDom.appendChild(createWordDom(word))
  }
})

function createWordDom (word) {
  const dom = document.createElement('div')
  dom.classList.add('word')

  const innerDom = document.createElement('div')

  const btn = document.createElement('button')
  btn.textContent = 'x'
  btn.classList.add('btn')
  btn.classList.add('small')
  btn.addEventListener('click', e => handleWordClick(word))

  const wordText = document.createElement('a')
  wordText.classList.add('word-text')
  wordText.classList.add('ml-2')
  wordText.href = `https://fanyi.baidu.com/#en/zh/${word}`
  wordText.target = '_blank'
  wordText.textContent = word

  dom.appendChild(innerDom)

  innerDom.appendChild(btn)
  innerDom.appendChild(wordText)

  return dom
}
