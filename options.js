/**
 * @typedef {import('node_modules/@types/react/index.d.ts').React} React
 * @typedef {import('node_modules/@types/react-dom/index.d.ts').ReactDOM} ReactDOM
 */
function App() {
  const [translator, setTranslator] = React.useState(false);
  React.useEffect(() => {
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
    className: "m-4"
  }, /*#__PURE__*/React.createElement("h2", null, "\u82F1\u8BED\u751F\u8BCD\u672C(English Vocabulary Book)"), /*#__PURE__*/React.createElement("h4", null, "Settings"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "display-flex mb-2"
  }, /*#__PURE__*/React.createElement("label", null, "use google translate"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: translator,
    onChange: translateChangeHandler
  }))));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));