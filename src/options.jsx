/**
 * @typedef {import('node_modules/@types/react/index.d.ts').React} React
 * @typedef {import('node_modules/@types/react-dom/index.d.ts').ReactDOM} ReactDOM
 */

function App() {
  const [translator, setTranslator] = React.useState(false);
  React.useEffect(() => {
    getTranslateVendor().then((r) => {
      setTranslator(!!r);
    });
  }, []);

  const translateChangeHandler = (event) => {
    const checked = event.target.checked;
    setTranslateVendor(checked ? "google" : "").then(() => {
      location.reload();
    });
  };

  return (
    <div className="m-4">
      <h2>英语生词本(English Vocabulary Book)</h2>
      <h4>Settings</h4>
      <div className="container">
        <div className="display-flex mb-2">
          <label>use google translate</label>
          <input
            type="checkbox"
            checked={translator}
            onChange={translateChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
