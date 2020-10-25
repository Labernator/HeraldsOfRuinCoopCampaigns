import React from "react";
import { FactionEnum, TacticalPoints, Warband } from "../types";
import { getTotalUnitPrice } from "../utility";
import { ArmyKeywordsRenderer } from "./ArmyKeywords";
import { ArmyRulesHeaderRenderer } from "./ArmyRules";
import { ArmyTacticalPointsRenderer } from "./ArmyTacticalPoints";
import { ModelSheetRenderer } from "./ModelSheet";

export const WarbandRenderer = ({ state, page, rosterPrice, stratagems, keywords, fullRender }: { state: Warband; page: { nr: number; total: number }; rosterPrice: number; stratagems: TacticalPoints[]; keywords: string[]; fullRender?: boolean }) =>
    <div id={`roster-sheet-container${page.nr}`} className={`${fullRender ? "a4-container" : "pdf-container"}`}>
        <div className="roster-sheet-title">{`${state.Title} - ${state.Faction} (${rosterPrice} pts)`}</div>
        {page.nr === 1 ?
            <div>
                {state.ArmyRules ? <ArmyRulesHeaderRenderer armyRules={state.ArmyRules} /> : undefined}
                <ArmyKeywordsRenderer keywords={keywords} />
                <ArmyTacticalPointsRenderer stratagems={stratagems} philosophy={state.Philosophy} />
            </div> :
            undefined}
        {state.Roster?.map((member) => <ModelSheetRenderer key={`modelsheet-${member.name}-${getTotalUnitPrice(member, state.Faction as FactionEnum)}`} model={member} faction={state.Faction as FactionEnum} />)}
        <div className="roster-sheet-footer">{`${page.nr} / ${page.total}`}</div>
    </div >;
