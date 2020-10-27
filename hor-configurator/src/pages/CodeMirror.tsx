// tslint:disable: no-implicit-dependencies
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/material.css";
import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { ExportWarbandIcon, RefreshWarbandDisabledIcon, RefreshWarbandIcon } from "../images";
import { Warband } from "../types";

export const CodeEditorContainer = ({ code, visible, onSave }: { code: Warband; visible: boolean; onSave: any }) => {
    const [codeEditorState, setCodeEditorState] = useState(JSON.stringify(code, null, 2));
    const [isSaved, setSaved] = useState<boolean>(true);
    const [isDirty, setDirty] = useState<boolean>(false);
    useEffect(() => {
        setCodeEditorState(JSON.stringify(code, null, 2));
    }, [code]);

    const savevJsonToFile = (state: string) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const blob = new Blob([state], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = `${code.Title} - ${code.Faction}.json`;
        anchor.id = "ClickableDownloadAnchor";
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
        setSaved(true);
    };
    const refreshRendering = () => {
        onSave(JSON.parse(codeEditorState));
        setDirty(false);
    };

    const cmOptions = {
        theme: "default",
        height: "auto",
        viewportMargin: Infinity,
        mode: {
            name: "javascript",
            json: true,
            statementIndent: 2,
        },
        lineNumbers: true,
        // lineWrapping: true,
        indentWithTabs: false,
        tabSize: 2,
    };

    return (
        visible ? <div className="code-mirror-container">
            <img
                src={isDirty ? RefreshWarbandIcon : RefreshWarbandDisabledIcon}
                style={{ width: "50px", height: "50px", left: "975px", cursor: isDirty ? "pointer" : "auto" }}
                className="toolbar-icon"
                alt="Refresh Warband"
                onClick={() => isDirty ? refreshRendering() : (() => undefined)()}
                title={`${isDirty ? "Refresh warband" : "Make a change in the Editor. Afterwards you can trigger the refresh by clicking here"}`}
            />
            <img
                src={ExportWarbandIcon}
                style={{ width: "50px", height: "50px", left: "1050px" }}
                className="toolbar-icon"
                alt="Save JSON file"
                onClick={() => savevJsonToFile(codeEditorState)}
                title="Save JSON file"
            />
            <div className="code-mirror-title">Warband JSON Editor</div>
            <CodeMirror
                className="code-mirror-editor"
                value={codeEditorState}
                options={cmOptions}
                autoCursor={false}
                onBeforeChange={(_editor: any, _data: any, value: string) => {
                    setCodeEditorState(value);
                }}
                onChange={(_editor: any, _data: any, value: any) => {
                    if (_data.removed.toString().length === 0) {
                        _editor.setCursor({ ..._editor.getCursor(), ch: _editor.getCursor().ch as number + 1 });
                    } else if (_data.from.sticky === 1) {
                        _editor.setCursor({ ..._editor.getCursor(), ch: _editor.getCursor().ch as number - 1 });
                    }
                    setDirty(true);
                    setSaved(false);
                }}
            />
        </div> : null
    );
};
