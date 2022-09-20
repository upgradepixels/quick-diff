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

  const [diffObj, setDiffObj] = useState({
    left: defaultLeft,
    right: defaultRight,
  });

  const [showDiffEditor, setShowDiffEditor] = useState(false);

  const [diffConfig, setDiffConfig] = useState({
    diffMode: DIFF_MODE.SIDE_BY_SIDE,
    language: {
      id: 1,
      name: "json",
    },
  });

  const handleShowDiff = () => {
    setShowDiffEditor((prev) => !prev);
    setDiffObj({
      left: leftInput,
      right: rightInput,
    });
  };


  const handleClipboard = async (panel) => {
    const text = await navigator.clipboard.readText();

    switch (panel) {
      case PANEL.LEFT:
        setLeftInput(text);
        break;
      case PANEL.RIGHT:
        setRightInput(text);
        break;
      default:
        break;
    }
  };

  const handleClear = (panel) => {
    switch (panel) {
      case PANEL.LEFT:
        setLeftInput("");
        break;
      case PANEL.RIGHT:
        setRightInput("");
        break;
      default:
        break;
    }
  };

  const handleInputChange = (panel, value) => {
    switch (panel) {
      case PANEL.LEFT:
        setLeftInput(value);
        break;
      case PANEL.RIGHT:
        setRightInput(value);
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
          <CTAButton handleOnClick={() => handleShowDiff()}>
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
            value={leftInput}
            onChange={(value) => handleInputChange(PANEL.LEFT, value)}
            handleClipboard={() => handleClipboard(PANEL.LEFT)}
            handleClear={() => handleClear(PANEL.LEFT)}
            language={diffConfig.language.name}
            styling={{ justifyContent: "flex-start" }}
          />
          <InputEditor
            value={rightInput}
            onChange={(value) => handleInputChange(PANEL.RIGHT, value)}
            handleClipboard={() => handleClipboard(PANEL.RIGHT)}
            handleClear={() => handleClear(PANEL.RIGHT)}
            language={diffConfig.language.name}
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
      className="px-2.5 h-6 text-xs rounded text-white bg-[#1a1523] customBtn"
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
  language,
  styling,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-full">
      <Editor
        theme="vs-light"
        language={language}
        value={value}
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
