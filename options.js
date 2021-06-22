const dom = document.querySelector("#words");

getWords().then(async (words) => {
  const titleDom = document.querySelector("#words-count");
  titleDom.textContent = `Count (${words.length})`;

  if (words.length === 0) {
    const d = document.createElement("div");
    d.classList.add("no-words");
    d.textContent = `No collected words!`;
    dom.appendChild(d);
    return;
  }

  for (let word of words) {
    dom.appendChild(await createWordDom(word));
  }

  getTranslateVendor().then((r) => {
    if (r === "google") {
      document.querySelector("#use-google-translate").checked = true;
    }
  });
});

document
  .querySelector("#use-google-translate")
  .addEventListener("change", (event) => {
    const checked = event.target.checked;
    setTranslateVendor(checked ? "google" : "").then((r) => {
      location.reload();
    });
  });

document.querySelector("#toggle-view").addEventListener("change", (event) => {
  document.querySelector("#words").classList.toggle("words-list-2-c");
});

document.querySelector("#delete-batch").addEventListener("click", (event) => {
  const checkedInputs = document.querySelectorAll("#words input:checked");
  const items = Array.from(checkedInputs).map((it) => {
    const dataset = it.closest(".word[data-id]").dataset;
    return {
      id: dataset.id,
      text: dataset.text,
    };
  });

  if (items.length <= 0) {
    return;
  }

  const ids = items.map((it) => it.id);
  const texts = items.map((it) => it.text);

  const _confirm = window.confirm(
    `Do you really want to delete <${texts.join(",")}> words?`
  );

  if (!_confirm) {
    return;
  }

  deleteWordByIds(ids).then((r) => {
    location.reload();
  });
});

document.querySelector("#output-to-json").addEventListener("click", (event) => {
  getWords().then((words) => {
    if (words.length === 0) {
      sendNotification(`There is no collected words for export!`);
      return;
    }

    const _words = words.map((item) => item.text);
    const data = JSON.stringify(_words, null, 4);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `collect-new-english-words-${generateUID()}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
