document.querySelector(".menu").addEventListener("click", (event) => {
  const text = event.target.textContent;
  switch (text) {
    case "Manage words book":
      chrome.tabs.create({
        url: "book.html",
      });
      break;
    case "Options":
      chrome.tabs.create({
        url: "options.html",
      });
  }
});
