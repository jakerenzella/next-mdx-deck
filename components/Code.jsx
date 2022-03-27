import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { useCurrentSlide } from "../context/CurrentSlideContext";

export default function Code(props) {
  const [compileResponse, setResponse] = React.useState("");
  const [code, setCode] = React.useState(props.code);
  const [language, setLanguage] = React.useState(props.language);

  const { inCodeChange } = useCurrentSlide();

  async function runCode(code) {
    const data = { language: "c", code: code };
    let response = await fetch("http://localhost:3000/compile", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let responseData = await response.text();
    return responseData;
  }

  async function compileCode(code) {
    const response = await runCode(code); // command waits until completion
    setResponse(response);
  }

  const onFocus = () => inCodeChange(true);
  const onBlur = () => inCodeChange(false);

  return (
    <div className="CodeMirror">
      <CodeMirror
        className="text-align: left!important"
        value={code}
        language="cpp"
        theme="dark"
        extensions={[cpp()]}
        onChange={(value, viewUpdate) => setCode(value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button onClick={() => compileCode(code)}>Run</button>
      <button onClick={() => setResponse("")}>Clear</button>
      {compileResponse != "" ? (
        <CodeMirror
          value={compileResponse}
          language="cpp"
          editable={false}
          theme="dark"
          extensions={[cpp()]}
        />
      ) : null}
    </div>
  );
}
