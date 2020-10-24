import React, { useEffect, useState } from "react";
import { ImportWarbandIcon } from "../images";
import { FactionEnum, Model, PageMap, Warband } from "../types";
import { FileUploader, getAllKeywords, getRosterPrice, getStratagems, PdfGenerator } from "../utility/index";
import { WarbandRenderer } from "../WarbandRendering/WarbandRenderer";

export const WarbandPage = (path: any) => {
    const [modelMap, setModelMap] = useState<PageMap[]>([]);
    const [state, setState] = useState<Warband>(path.location.state as Warband);
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

    const faction = state.Faction as FactionEnum;
    const rosterPrice = getRosterPrice(state.Roster, faction);
    const filterRosterToPage = (page: number): Model[] => state.Roster.filter((member) => modelMap.find((entry) => entry.id === `modelsheet_${member.name}` && entry.page === page));
    return <div>
        <PdfGenerator title={state.Title} />
        <FileUploader image={
            <img style={{ width: "50px", height: "50px", left: "150px" }} alt="OpenWarband" className="pdf-export" src={ImportWarbandIcon} title="Open another warband from file" />
        } setStateCallback={setState} />
        {modelMap.length ?
            <div><WarbandRenderer state={{ ...state, Roster: filterRosterToPage(1) }} page={1} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
                <WarbandRenderer state={{ ...state, Roster: filterRosterToPage(2) }} page={2} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
                <WarbandRenderer state={{ ...state, Roster: filterRosterToPage(3) }} page={3} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} />
            </div > : undefined
        }
        <WarbandRenderer state={state} page={1} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} fullRender={true} />
    </div >;
};
