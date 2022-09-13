import React, { useState, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import DiffModeSelect from "./DiffModeSelect";

const defaultJSON = `{
  "timestamp": "2022-09-11T11:35:44+07:00",
  "event": "visit",
  "page": "home"
}`;

const SecondJSON = `{
  "timestamp": "2022-09-22T09:40:44+07:00",
  "event": "click on button",
  "page": "user",
  "id": "ABCD"
}`;

const MonacoEditor = () => {
  const [diffObj, setCode] = useState({
    left: defaultJSON,
    right: SecondJSON,
  });

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log("editorRef", editorRef);
  }

  return (
    <div className="w-full flex flex-col h-70">
      <div className="w-full mb-4 flex flex-row justify-between items-end">
        <div className="flex flex-row gap-2">
          <DiffModeSelect/>
        </div>
        <div className="flex flex-row gap-2">
          <CustomButton>Swap</CustomButton>
          <CustomButton>Clear all</CustomButton>
        </div>
      </div>
      <DiffEditor
        height="70vh"
        width="100%"
        language="json"
        theme="vs-light"
        onMount={handleEditorDidMount}
        original={diffObj.left}
        modified={diffObj.right}
      />
      <div className="w-full mt-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
        <CustomButton>Clipboard</CustomButton>
          <CustomButton>Clear</CustomButton>
        </div>
        <div className="flex flex-row gap-2">
          <CustomButton>Clipboard</CustomButton>
          <CustomButton>Clear</CustomButton>
        </div>
      </div>
    </div>
  );
};

const CustomButton = ({children, handleOnClick}) => {
  return (
    <button className="px-2 py-[3px] text-xs rounded-sm text-white bg-[#1a1523] hover:bg-[#e38ec3]" onClick={handleOnClick}>
      {children}
    </button>
  )
}

export default MonacoEditor;
