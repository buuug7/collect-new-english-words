/**
 * @typedef {import('node_modules/@types/react/index.d.ts').React} React
 * @typedef {import('node_modules/@types/react-dom/index.d.ts').ReactDOM} ReactDOM
 */
const {
  useEffect,
  useState
} = React;

const __q = selector => document.querySelector(selector);

function HeaderLeft({
  words
}) {
  const [translator, setTranslator] = useState(false);
  useEffect(() => {
    getTranslateVendor().then(r => {
      setTranslator(!!r);
    });
  }, []);

  const translateChangeHandler = event => {
    const checked = event.target.checked;
    setTranslateVendor(checked ? "google" : "").then(() => {
      location.reload();
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "header-left display-flex flex-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/icon-32x32.png",
    className: "logo",
    alt: "logo"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mx-2",
    style: {
      fontSize: "1.1rem"
    }
  }, "\u751F\u8BCD\u672C ", `(${words.length})`), /*#__PURE__*/React.createElement("div", {
    className: "form-check translate-setting mx-1 "
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, "use google translate"), /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "checkbox",
    checked: translator,
    onChange: translateChangeHandler
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-check toggle-view ml-2 mx-1 "
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, "toggle view"), /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "checkbox",
    onChange: () => {
      __q(".word-list").classList.toggle("grid-column-2");
    }
  })));
}

function HeaderRight({
  words
}) {
  const selectedItems = words.filter(it => it.checked);
  const ids = selectedItems.map(it => it.id);
  const texts = selectedItems.map(it => it.text);
  const deleteCount = ids.length;

  const deleteHandler = () => {
    const _confirm = window.confirm(`Do you really want to delete <${texts.join(",")}> words?`);

    if (!_confirm) {
      return;
    }

    deleteWordByIds(ids).then(() => {
      location.reload();
    });
  };

  const exportHandler = () => {
    getWords().then(words => {
      if (words.length === 0) {
        sendNotification(`There is no collected words for export!`);
        return;
      }

      const _words = words.map(item => item.text);

      const data = JSON.stringify(_words, null, 4);
      const blob = new Blob([data], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `collect-new-english-words-${generateUID()}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const buttonText = `delete ${deleteCount ? "(" + deleteCount + ")" : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn small ${deleteCount > 0 ? "primary" : "disabled"}`,
    onClick: deleteHandler
  }, buttonText), /*#__PURE__*/React.createElement("button", {
    className: "btn small nowrap primary ml-2",
    onClick: exportHandler
  }, "export"));
}

function Header({
  words
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "header display-flex align-items-center mb-2 px-4"
  }, /*#__PURE__*/React.createElement(HeaderLeft, {
    words: words
  }), /*#__PURE__*/React.createElement(HeaderRight, {
    words: words
  }));
}

function Word({
  word,
  itemSelected
}) {
  const [translator, setTranslator] = useState("");
  useEffect(() => {
    getTranslateVendor().then(r => {
      setTranslator(r);
    });
  }, []);
  const detailLink = translator === "google" ? `https://translate.google.com/?sl=en&tl=zh-CN&text=${word.text}&op=translate` : `https://fanyi.baidu.com/#en/zh/${word.text}`;

  const onChangeHandler = event => {
    itemSelected({ ...word,
      checked: event.target.checked
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "word"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-check inline"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "checkbox",
    checked: !!word.checked,
    onChange: onChangeHandler
  })), /*#__PURE__*/React.createElement("a", {
    href: detailLink,
    className: "ml-2 word-text",
    target: "_blank"
  }, word.text));
}

function WordList({
  words,
  itemSelected
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "word-list px-4 mb-4"
  }, words.map(word => /*#__PURE__*/React.createElement(Word, {
    word: word,
    key: word.id,
    itemSelected: itemSelected
  })));
}

function App() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    getWords().then(r => {
      setWords(r);
    });
  }, []);

  const itemSelectedCallback = item => {
    setWords(prevState => {
      return prevState.map(preItem => {
        return preItem.id === item.id ? item : preItem;
      });
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Header, {
    words: words
  }), /*#__PURE__*/React.createElement(WordList, {
    words: words,
    itemSelected: itemSelectedCallback
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), __q("#root"));