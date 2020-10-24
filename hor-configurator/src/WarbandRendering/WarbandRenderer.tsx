import React from "react";
import { FactionEnum, TacticalPoints, Warband } from "../types";
import { ArmyKeywordsRenderer } from "./ArmyKeywords";
import { ArmyRulesHeaderRenderer } from "./ArmyRules";
import { ArmyTacticalPointsRenderer } from "./ArmyTacticalPoints";
import { ModelSheetRenderer } from "./ModelSheet";

export const WarbandRenderer = ({ state, page, rosterPrice, stratagems, keywords, fullRender }: { state: Warband; page: number; rosterPrice: number; stratagems: TacticalPoints[]; keywords: string[]; fullRender?: boolean }) =>
    <div id={`quick-ref-roster-container${page}`} className={`quick-reference-enemies-top-container ${fullRender ? "a4-container" : "pdf-container"}`}>
        <div className="quick-ref-title">{`${state.Title} - ${state.Faction} (${rosterPrice} pts) - ${page === 1 ? "Roster" : "Roster Page 2"}`}</div>
        {page === 1 ?
            <div>
                {state.ArmyRules ? <ArmyRulesHeaderRenderer armyRules={state.ArmyRules} /> : undefined}
                <ArmyKeywordsRenderer keywords={keywords} />
                <ArmyTacticalPointsRenderer stratagems={stratagems} philosophy={state.Philosophy} />
            </div> :
            undefined}
        {state.Roster?.map((member) => <ModelSheetRenderer key={`modelsheet_${member.name}`} model={member} faction={state.Faction as FactionEnum} />)}
    </div >;
