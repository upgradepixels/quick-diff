import React, { useState, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";

const defaultJSON = `{
  "timestamp": "2022-09-11T11:35:44+07:00",
  "event": "visit",
  "page": "home"
}`

const SecondJSON = `{
  "timestamp": "2022-09-22T09:40:44+07:00",
  "event": "click on button",
  "page": "user",
  "id": "ABCD"
}`

const MonacoEditor = () => {
  const [diffObj, setCode] = useState({
    left: defaultJSON,
    right: SecondJSON
  });

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log("editorRef", editorRef);
  }

  return (
    <DiffEditor
      height="92vh"
      width="98%"
      language="json"
      theme="vs-dark"
      onMount={handleEditorDidMount}
      original={diffObj.left}
      modified={diffObj.right}
    />
  );
};

export default MonacoEditor;
