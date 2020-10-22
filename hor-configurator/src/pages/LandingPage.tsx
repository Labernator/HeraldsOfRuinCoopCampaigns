import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as DarkAngelsJson from "../data/DarkAngels.json";
import * as PrimarisJson from "../data/PrimarisBois.json";
import * as TauJson from "../data/TauEmpire.json";
import { DarkAngelsCover, PrimarisCover, TauEmpireCover } from "../icons";
import { Warband } from "../types";
import { FileUploader } from "../utility/index";

export const LandingPage = () => {
    const [state, setState] = useState<Warband | undefined>(undefined);
    const [pathname, setPathName] = useState<string>("");
    const setStateAndPath = (stateFromCallback: Warband) => {
        setState(stateFromCallback);
        setPathName("/Warband");
    };
    return (
        <div className="a4-container">
            <div style={{ fontSize: "35px", fontWeight: "bold", float: "left", padding: "10px" }}>Choose your warband to view its roster</div>
            <div style={{ display: "grid", gridTemplateColumns: "264px 264px 264px", float: "left" }}>
                {state ? <Redirect to={{ pathname, state }} /> : undefined}
                <img
                    alt="DarkAngels"
                    className="landing-page-column-icon"
                    src={DarkAngelsCover}
                    onClick={() => {
                        setState((DarkAngelsJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="TauEmpire"
                    className="landing-page-column-icon"
                    src={TauEmpireCover}
                    onClick={() => {
                        setState((TauJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="Primaris"
                    className="landing-page-column-icon"
                    src={PrimarisCover}
                    onClick={() => {
                        setState((PrimarisJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
            </div>
            <div style={{ fontSize: "30px", fontWeight: "bold", float: "left", padding: "50px 10px 10px 10px" }}>Alternatively load your own warband roster from file:</div>
            <FileUploader setStateCallback={setStateAndPath} />
        </div >
    );
};
