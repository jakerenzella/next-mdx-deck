import React, { useEffect, createContext, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import useEventListener from "../hooks/useEventListener";

export default function Code({ _code, props }) {
  const [focused, setFocused] = React.useState(false);
  const [compileResponse, setResponse] = React.useState("");

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
    console.log(response);
    setResponse(response);
  }

  const navigate = (e) => {
    console.log(focused);
    if (focused) {
      console.log("prefenting default");
      e.stopPropagation();
    }
  };

  useEventListener("keydown", navigate);

  const [code, setCode] = React.useState(
    `#include <stdio.h>
    int main() {
       // printf() displays the string inside quotation
       printf("Hello, World!");
       return 0;
    }`
  );
  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "ArrowLeft") {
      console.log("left press here! ");
    }
  };
  const onFocus = () => {
    console.log("focussing");
    setFocused(true);
  };
  const onBlur = () => {
    console.log("blurring");
    setFocused(false);
  };
  return (
    <div className="CodeMirror">
      <CodeMirror
        className="text-align: left!important"
        value={code}
        language="cpp"
        // height="400px"
        theme="dark"
        extensions={[cpp()]}
        onChange={(value, viewUpdate) => {
          console.log("value:", value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : null}
    </div>
  );
}
