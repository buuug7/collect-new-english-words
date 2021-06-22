document.querySelector('.menu').addEventListener('click', event => {
  const text = event.target.textContent
  switch (text) {
    case 'Manage words book':
      chrome.runtime.openOptionsPage()
      break
  }
})
