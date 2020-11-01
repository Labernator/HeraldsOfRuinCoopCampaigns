import React from "react";
import { FactionEnum, TacticalPoints, Warband } from "../types";
import { getFactionSpecifics, getRealModel, getTotalUnitPrice } from "../utility";
import { ArmyKeywordsRenderer } from "./ArmyKeywords";
import { ArmyRulesHeaderRenderer } from "./ArmyRules";
import { ArmyTacticalPointsRenderer } from "./ArmyTacticalPoints";
import { ModelSheetRenderer } from "./ModelSheet";

export const WarbandRenderer = ({ state, page, rosterPrice, stratagems, keywords, fullRender }: { state: Warband; page: { nr: number; total: number }; rosterPrice: number; stratagems: TacticalPoints[]; keywords: string[]; fullRender?: boolean }) =>
    <div id={`roster-sheet-container${page.nr}`} className={`${fullRender ? "a4-container" : "pdf-container"}`} style={{ float: "left" }}>
        <div className="roster-sheet-title">{`${state.Title} - ${state.Faction} (${rosterPrice} pts)`}</div>
        {page.nr === 1 ?
            <div>
                <ArmyRulesHeaderRenderer armyRules={state.Alignment ? [state.Alignment, ...state.ArmyRules || []] : state.ArmyRules} />
                <ArmyKeywordsRenderer keywords={keywords.map((keyword) => keyword === getFactionSpecifics(state.Faction as FactionEnum).AlignmentPlaceholder ? state.Alignment || "" : keyword).sort()} />
                <ArmyTacticalPointsRenderer stratagems={stratagems} philosophy={state.Philosophy} faction={state.Faction as FactionEnum} />
            </div> :
            undefined}
        {state.Roster?.map((member) => <ModelSheetRenderer
            key={`modelsheet-${member.name}-${getTotalUnitPrice(member, state.Faction as FactionEnum)}`}
            model={getRealModel(member, state.Faction as FactionEnum, state.Alignment)}
            faction={state.Faction as FactionEnum}
            alignment={state.Alignment}
        />)}
        <div className="roster-sheet-footer">{`${page.nr} / ${page.total}`}</div>
    </div >;
