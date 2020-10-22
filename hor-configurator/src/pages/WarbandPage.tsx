import React, { useEffect, useState } from "react";
import { FactionEnum, Model, PageMap, Warband } from "../types";
import { getAllKeywords, getRosterPrice, getStratagems, PdfGenerator } from "../utility/index";
import { WarbandRenderer } from "../WarbandRendering/WarbandRenderer";

export const WarbandPage = (path: any) => {
    const [modelMap, setModelMap] = useState<PageMap[]>([]);
    useEffect(() => {
        setModelMap([
            ...modelMap,
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) => el.getBoundingClientRect().height + el.getBoundingClientRect().top < 1122).map((element) => ({ "id": element.id, "page": 1 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) =>
                el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 1122 &&
                el.getBoundingClientRect().height + el.getBoundingClientRect().top < 2244
            ).map((element) => ({ "id": element.id, "page": 2 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) => el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 2244).map((element) => ({ "id": element.id, "page": 3 })),
        ]);
    }, []);

    const state = path.location.state as Warband;
    const faction = state.Faction as FactionEnum;
    const rosterPrice = getRosterPrice(state.Roster, faction);
    const filterRosterToPage = (page: number): Model[] => state.Roster.filter((member) => modelMap.find((entry) => entry.id === `modelsheet_${member.name}` && entry.page === page));
    return <div>
        <PdfGenerator title={state.Title} />
        {modelMap.length ?
            <div><WarbandRenderer state={{ ...state, Roster: filterRosterToPage(1) }} page={1} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
                <WarbandRenderer state={{ ...state, Roster: filterRosterToPage(2) }} page={2} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
                <WarbandRenderer state={{ ...state, Roster: filterRosterToPage(3) }} page={3} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
            </div > : undefined
        }
        <WarbandRenderer state={state} page={1} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} fullRender={true} />
    </div >;
};
