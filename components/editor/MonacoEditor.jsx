import React, { useState, useRef } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import SelectMenu from "./SelectMenu";
import LanguageComboBox from "./LanguageComboBox";

const PANEL = {
  LEFT: "left",
  RIGHT: "right",
};

const DIFF_MODE = {
  SIDE_BY_SIDE: "side-by-side",
  INLINE: "inline",
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
  const [leftInput, setLeftInput] = useState(defaultLeft);
  const [rightInput, setRightInput] = useState(defaultRight);

  const [diffObj, setCode] = useState({
    left: defaultLeft,
    right: defaultRight,
  });

  const [showDiffEditor, setShowDiffEditor] = useState(false);

  // const [selectedLanguage, setSelectedLanguage] = useState({
  //   id: 1,
  //   name: "json",
  // });

  const [diffConfig, setDiffConfig] = useState({
    diffMode: DIFF_MODE.SIDE_BY_SIDE,
    language: {
      id: 1,
      name: "json",
    },
  });

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleFindDiff = () => {
    setShowDiffEditor((prev) => !prev);
  };

  const handleSwap = () => {
    console.log("Swap Button On Clicked", diffObj);
    setCode({
      left: diffObj.right,
      right: diffObj.left,
    });
  };

  const handleClearAll = () => {
    console.log("Clear All Button On Clicked", diffObj);
    setCode({
      left: "",
      right: "",
    });
  };

  const handleClipboard = async (panel) => {
    const text = await navigator.clipboard.readText();
    console.log("Clipboard Button On Clicked", text);
    switch (panel) {
      case PANEL.LEFT:
        setCode({ ...diffObj, left: text });
        break;
      case PANEL.RIGHT:
        setCode({ ...diffObj, right: text });
        break;
      default:
        break;
    }
  };

  const handleClear = (panel) => {
    switch (panel) {
      case PANEL.LEFT:
        setCode({ ...diffObj, left: "" });
        break;
      case PANEL.RIGHT:
        setCode({ ...diffObj, right: "" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mb-4 flex flex-row justify-between items-end">
        <div className="flex flex-row">
          <SelectMenu />
        </div>
        <div className="flex flex-row">
          <CTAButton handleOnClick={() => handleFindDiff()}>
            {showDiffEditor ? "Edit input" : "Show difference"}
          </CTAButton>
        </div>
      </div>

      {showDiffEditor ? (
        <div className="w-full editorContainer">
          <DiffEditor
            width="100%"
            language={diffConfig.language.name}
            theme="vs-light"
            onMount={handleEditorDidMount}
            original={diffObj.left}
            modified={diffObj.right}
            style={{
              height: "100%",
            }}
          />
        </div>
      ) : (
        <div className="flex flex-row w-full editorContainer">
          <InputEditor
            value={defaultLeft}
            styling={{ justifyContent: "flex-start" }}
          />
          <InputEditor
            value={defaultRight}
            styling={{ justifyContent: "flex-end" }}
          />
        </div>
      )}
    </div>
  );
};

const CustomButton = ({ children, handleOnClick }) => {
  return (
    <button
      className="w-20 h-6 text-xs rounded text-white bg-[#1a1523] customBtn"
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

const CTAButton = ({ children, handleOnClick }) => {
  return (
    <button
      className="px-2.5 h-8 text-[14px] rounded text-white ctaBtn"
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

const InputEditor = ({
  value,
  onChange,
  handleClipboard,
  handleClear,
  styling,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-full">
      <Editor
        theme="vs-light"
        defaultLanguage="json"
        defaultValue={value}
        onChange={onChange}
        style={{
          height: "100%",
        }}
      />
      <div className="flex flex-row gap-2 mt-2" style={styling}>
        <CustomButton handleOnClick={handleClipboard}>Clipboard</CustomButton>
        <CustomButton handleOnClick={handleClear}>Clear</CustomButton>
      </div>
    </div>
  );
};

export default MonacoEditor;
