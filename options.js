const dom = document.querySelector("#words");

getWords().then(async (words) => {
  console.log("words", words);
  const titleDom = document.querySelector("#words-count");
  titleDom.textContent = `Count (${words.length})`;

  for (let word of words) {
    dom.appendChild(await createWordDom(word));
  }

  getTranslateVendor().then((r) => {
    console.log("getTranslateVendor", r);
    if (r === "google") {
      document.querySelector("#use-google-translate").checked = true;
    }
  });

  AddDeleteListener(words);
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

document.querySelector("#output-to-json").addEventListener("click", (event) => {
  getWords().then((words) => {
    const _words = words.map((item) => item.text);
    const data = JSON.stringify(_words);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "collect-new-english-words.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
