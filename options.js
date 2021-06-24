/**
 * @typedef {import('node_modules/@types/react/index.d.ts').React} React
 * @typedef {import('node_modules/@types/react-dom/index.d.ts').ReactDOM} ReactDOM
 */

const e = React.createElement;

function App() {
  const [translator, setTranslator] = React.useState(false);
  React.useEffect(() => {
    getTranslateVendor().then((r) => {
      setTranslator(!!r);
    });
  }, []);

  return e(
    "div",
    { className: "m-4" },
    e("h2", {}, "collect new english words"),
    e("h4", {}, "Settings"),
    e(
      "div",
      { className: "container" },
      e(
        "div",
        { className: "display-flex mb-2" },
        e(
          "label",
          { className: "use-google-translate" },
          "use google translate"
        ),
        e("input", {
          type: "checkbox",
          checked: translator,
          onChange: (e) => {
            const checked = event.target.checked;
            setTranslateVendor(checked ? "google" : "").then((r) => {
              location.reload();
            });
          },
        })
      )
    )
  );
}

ReactDOM.render(e(App), document.querySelector("#root"));
