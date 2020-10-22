import React from "react";
import * as DenizenJson from "../data/Denizens.json";
import { Denizens } from "../types";
import { DataSheetRenderer } from "./DataSheetRenderer";

const getNightMarketDenizens1 = () => (DenizenJson as Denizens).NightMarket.map((denizen, idx) => idx < 5 ? <DataSheetRenderer enemy={denizen} skipKeywords={true} /> : undefined);
const getNightMarketDenizens2 = () => (DenizenJson as Denizens).NightMarket.map((denizen, idx) => idx >= 5 ? <DataSheetRenderer enemy={denizen} skipKeywords={true} /> : undefined);

export const Enemies = () =>
    <div>
        <div id="quick-ref-enemy-container1" className="quick-reference-enemies-top-container">
            <div className="quick-ref-title">NIGHT MARKETS - ENEMIES - Page 1 </div>
            {getNightMarketDenizens1()}
        </div >
        <div id="quick-ref-enemy-container2" className="quick-reference-enemies-top-container">
            <div className="quick-ref-title">NIGHT MARKETS - ENEMIES - Page 2</div>
            {getNightMarketDenizens2()}
        </div >

    </div>;
