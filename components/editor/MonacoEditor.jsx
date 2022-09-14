import React, { useState, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import SelectMenu from "./SelectMenu";
import LanguageComboBox from "./LanguageComboBox";

const PANEL = {
  LEFT: "left",
  RIGHT: "right",
};

const defaultLeft = `{
  "timestamp": "2022-09-11T11:35:44+07:00",
  "event": "visit",
  "page": "home"
}`;

const defaultRight = `{
  "timestamp": "2022-09-22T09:40:44+07:00",
  "event": "click on button",
  "page": "user",
  "id": "ABCD"
}`;

const MonacoEditor = () => {
  const [diffObj, setCode] = useState({
    left: defaultLeft,
    right: defaultRight,
  });

  const [selectedLanguage, setSelectedLanguage] = useState(
    { id: 1, name: 'json' }
  )

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log("editorRef", editorRef);
  }

  const handleSwap= () => {
    console.log("Swap Button On Clicked", diffObj);
    setCode({
      left: diffObj.right,
      right: diffObj.left,
    });
  }

  const handleClearAll = () => {
    console.log("Clear All Button On Clicked", diffObj);
    setCode({
      left: "",
      right: "",
    });
  }

  const handleClipboard = async (panel) => {
    const text = await navigator.clipboard.readText();
    console.log("Clipboard Button On Clicked", text);
    switch(panel) {
      case PANEL.LEFT:
        setCode({ ...diffObj, left: text });
        break;
      case PANEL.RIGHT:
        setCode({ ...diffObj, right: text });
        break;
      default:
        break;
    }
  }

  const handleClear = (panel) => {
    switch(panel) {
      case PANEL.LEFT:
        setCode({ ...diffObj, left: "" });
        break;
      case PANEL.RIGHT:
        setCode({ ...diffObj, right: "" });
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full flex flex-col h-70">
      <div className="w-full mb-4 flex flex-row justify-between items-end">
        <div className="flex flex-row gap-2">
          <SelectMenu/>
          <LanguageComboBox selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
        </div>
        <div className="flex flex-row gap-2">
          <CustomButton handleOnClick={handleSwap}>Swap</CustomButton>
          <CustomButton handleOnClick={handleClearAll}>Clear all</CustomButton>
        </div>
      </div>
      <DiffEditor
        height="70vh"
        width="100%"
        language={selectedLanguage.name}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        original={diffObj.left}
        modified={diffObj.right}
      />
      <div className="w-full mt-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <CustomButton handleOnClick={() => handleClipboard(PANEL.LEFT)}>Clipboard</CustomButton>
          <CustomButton handleOnClick={() => handleClear(PANEL.LEFT)}>Clear</CustomButton>
        </div>
        <div className="flex flex-row gap-2">
          <CustomButton handleOnClick={() => handleClipboard(PANEL.RIGHT)}>Clipboard</CustomButton>
          <CustomButton handleOnClick={() => handleClear(PANEL.RIGHT)}>Clear</CustomButton>
        </div>
      </div>
    </div>
  );
};

const CustomButton = ({children, handleOnClick}) => {
  return (
    <button className="px-2.5 py-1 text-xs rounded text-white bg-[#1a1523] customBtn" onClick={handleOnClick}>
      {children}
    </button>
  )
}

export default MonacoEditor;
