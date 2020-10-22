import React from "react";
import { ImportWarbandIcon } from "../icons";

export const FileUploader = ({ setStateCallback }: { setStateCallback(json: any): void; }) => {
    const onChange = () => {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            setStateCallback(JSON.parse(ev.target?.result as string));
        };
        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
    };
    return <label htmlFor="file-uploader" className="landing-page-columns" style={{ gridArea: "1/1" }}>
        <input id="file-uploader" type="file" accept=".json" style={{ visibility: "hidden" }} onChange={onChange}></input>
        <img style={{ width: "150px", height: "150px", float: "left" }} alt="ImportWarband" className="landing-page-column-icon" src={ImportWarbandIcon} />
    </label>;
};
