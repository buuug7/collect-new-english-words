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
  return /*#__PURE__*/React.createElement("div", {
    className: "m-4"
  }, /*#__PURE__*/React.createElement("h2", null, "collect new english words"), /*#__PURE__*/React.createElement("h4", null, "Settings"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "display-flex mb-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "use-google-translate"
  }, "use google translate"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: translator,
    onChange: () => {
      const checked = event.target.checked;
      setTranslateVendor(checked ? "google" : "").then(r => {
        location.reload();
      });
    }
  }))));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));