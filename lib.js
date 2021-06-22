function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

async function createWordDom(word) {
  const dom = document.createElement("div");
  dom.classList.add("word");
  dom.setAttribute("data-text", word.text);
  dom.setAttribute("data-id", word.id);

  const translateVendor = await getTranslateVendor();

  const detailLink =
    translateVendor === "google"
      ? `https://translate.google.com/?sl=en&tl=zh-CN&text=${word.text}&op=translate`
      : `https://fanyi.baidu.com/#en/zh/${word.text}`;

  dom.innerHTML = `
<div class="display-flex flex-center">
  <button class="btn small rm-word">Delete</button>
  <a class="ml-2 word-text" href=${detailLink} target="_blank">${word.text}</a>
</div>
`;

  return dom;
}

function getTranslateVendor() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("translateVendor", (data) => {
      resolve(data["translateVendor"]);
    });
  });
}

function setTranslateVendor(vendor) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        translateVendor: vendor,
      },
      () => {
        // sendNotification(`Translate is set to ${vendor ? vendor: 'baidu'}`);
        resolve("update successfully!");
      }
    );
  });
}

async function getWords() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("words", (data) => {
      resolve(data["words"] || []);
    });
  });
}

async function deleteWord(id, words) {
  const _confirm = window.confirm("Do you really want to delete this word?");

  if (!_confirm) {
    return;
  }

  const filteredWords = words.filter((it) => it.id !== id);
  return updateWords(filteredWords);
}

async function updateWords(words) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        words: words,
      },
      () => {
        resolve("update successfully!");
      }
    );
  });
}

function sendNotification(message) {
  chrome.notifications.create(`${generateUID()}`, {
    message: message,
    title: "collect new english words",
    type: "basic",
    iconUrl: "images/icon-64x64.png",
  });
}

async function addWord(text, words) {
  const _word = text.trim();
  if (!_word) {
    return;
  }

  const index = words.findIndex((it) => it.text === text);

  if (index !== -1) {
    sendNotification(`**${_word}** is already collected.`);
    return;
  }

  const _words = [...words];
  _words.push({
    id: generateUID(),
    text: _word,
  });
  return updateWords(_words);
}

function AddDeleteListener(words) {
  document.querySelector(`#words`).addEventListener("click", (e) => {
    const target = e.target;
    const classList = Array.from(target.classList);
    if (classList.includes("rm-word")) {
      const parent = target.closest(".word");
      const id = parent.dataset.id;
      if (id) {
        deleteWord(id, words).then((r) => {
          location.reload();
        });
      }
    }
  });
}
