/**
 * @typedef {import('node_modules/@types/react/index.d.ts').React} React
 * @typedef {import('node_modules/@types/react-dom/index.d.ts').ReactDOM} ReactDOM
 */

const e = React.createElement;

function HeaderLeft({ words }) {
  const [translator, setTranslator] = React.useState(false);

  React.useEffect(() => {
    getTranslateVendor().then((r) => {
      setTranslator(!!r);
    });
  }, []);

  return e(
    "div",
    { className: "header-left display-flex flex-center" },
    e("img", { className: "options-logo", src: "/images/icon-32x32.png" }),
    e("span", { className: "mx-1" }, `(${words.length})`),
    e(
      "div",
      { className: "display-flex align-items-center mx-1" },

      e("label", { className: "nowrap" }, "use google translate"),
      e("input", {
        type: "checkbox",
        checked: translator,
        onChange: (event) => {
          const checked = event.target.checked;
          setTranslateVendor(checked ? "google" : "").then((r) => {
            location.reload();
          });
        },
      })
    ),
    e(
      "div",
      { className: "display-flex align-items-center ml-2 mx-1" },
      e(
        "label",
        {
          className: "nowrap",
        },
        "toggle view"
      ),
      e("input", {
        type: "checkbox",
        onChange: (event) => {
          document.querySelector(".words").classList.toggle("words-list-2-c");
        },
      })
    )
  );
}

function HeaderRight({ words }) {
  const selectedItems = words.filter((it) => it.checked);
  const ids = selectedItems.map((it) => it.id);
  const texts = selectedItems.map((it) => it.text);

  const deleteCount = ids.length;

  console.log(deleteCount);

  return e(
    "div",
    { className: "header-right" },
    e(
      "button",
      {
        className: `btn small ${ids.length > 0 ? "primary" : "disabled"}`,
        onClick: () => {
          const _confirm = window.confirm(
            `Do you really want to delete <${texts.join(",")}> words?`
          );

          if (!_confirm) {
            return;
          }

          deleteWordByIds(ids).then((r) => {
            location.reload();
          });
        },
      },
      `batch deleted ${deleteCount ? `(${deleteCount})` : ""}`
    ),
    e(
      "button",
      {
        className: "btn small nowrap primary",
        onClick: () => {
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
        },
      },
      "output to json"
    )
  );
}

function Header({ words }) {
  return e(
    "div",
    { className: "options-header display-flex align-items-center mb-2 px-4" },
    e(HeaderLeft, { words }),
    e(HeaderRight, { words })
  );
}

function Word({ word, itemSelected }) {
  const [translator, setTranslator] = React.useState("");

  React.useEffect(() => {
    getTranslateVendor().then((r) => {
      setTranslator(r);
    });
  }, []);

  const detailLink =
    translator === "google"
      ? `https://translate.google.com/?sl=en&tl=zh-CN&text=${word.text}&op=translate`
      : `https://fanyi.baidu.com/#en/zh/${word.text}`;

  return e(
    "div",
    { className: "word" },
    e(
      "div",
      { className: "display-flex flex-center" },
      e("input", {
        type: "checkbox",
        checked: !!word.checked,
        onChange: (event) => {
          itemSelected({
            ...word,
            checked: event.target.checked,
          });
        },
      }),
      e(
        "a",
        { className: "ml-2 word-text", href: detailLink, target: "_blank" },
        word.text
      )
    )
  );
}

function Words({ words, itemSelected }) {
  return e(
    "div",
    { className: "words px-4 mb-4" },
    words.map((word) => {
      return e(Word, { word, key: word.id, itemSelected });
    })
  );
}

function App() {
  const [words, setWords] = React.useState([]);
  React.useEffect(() => {
    getWords().then((r) => {
      setWords(r);
    });
  }, []);

  return e(
    "div",
    { className: "app" },
    e(Header, { words }),
    e(Words, {
      words,
      itemSelected: (it) => {
        setWords((prevState) => {
          return prevState.map((item) => {
            return item.id === it.id ? it : item;
          });
        });
      },
    })
  );
}

ReactDOM.render(e(App), document.querySelector("#root"));
