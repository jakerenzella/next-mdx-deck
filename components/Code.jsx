import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { useCurrentSlide } from "../context/CurrentSlideContext";

export default function Code(props) {
  const initialCompileResponseState = {
    loading: false,
    success: false,
    error: false,
    result: "",
  };
  const [compileResponse, setResponse] = React.useState(
    initialCompileResponseState
  );
  const [code, setCode] = React.useState(props.code);
  const [language, setLanguage] = React.useState(props.language);

  const { inCode, inCodeChange } = useCurrentSlide();

  async function runCode(code) {
    const data = { language: "c", code: code };
    let response = await fetch("http://localhost:3000/compile", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let responseData = await response.text();

    return JSON.parse(responseData)["output"];
  }

  async function compileCode(code) {
    // loading
    setResponse({
      loading: true,
      success: false,
      error: false,
      result: "",
    });

    // run code
    try {
      const response = await runCode(code); // command waits until completion
      setResponse({
        loading: false,
        success: false,
        error: false,
        result: response,
      });
    } catch (error) {
      setResponse({
        loading: false,
        success: false,
        error: error,
        result:
          "Error submitting code to compililation server (did not compile)",
      });
    }
  }

  const onFocus = () => inCodeChange(true);
  const onBlur = () => inCodeChange(false);

  return (
    <div className="CodeMirror">
      <CodeMirror
        className="CodeEditor"
        value={code}
        language="cpp"
        theme="dark"
        extensions={[cpp()]}
        onChange={(value, viewUpdate) => setCode(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={!compileResponse.loading}
      />
      {language === "c" ? (
        <span>
          <div className="action-row" hidden={language === "C"}>
            <button
              disabled={compileResponse.loading}
              className="button"
              onClick={() => compileCode(code)}
            >
              Run
            </button>
            <button
              disabled={compileResponse.loading}
              className="button"
              onClick={() => setResponse(initialCompileResponseState)}
              style={{}}
            >
              Clear
            </button>
            {compileResponse.loading ? (
              <div>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {compileResponse.result != "" ? (
            <CodeMirror
              value={compileResponse.result}
              editable={false}
              theme="dark"
            />
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
