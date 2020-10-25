import React, { useEffect, useState } from "react";
import { ImportWarbandIcon } from "../images";
import { FactionEnum, Model, PageMap, Warband } from "../types";
import { FileUploader, getAllKeywords, getRosterPrice, getStratagems, getTotalUnitPrice, PdfGenerator } from "../utility";
import { WarbandRenderer } from "../WarbandRendering/WarbandRenderer";

export const WarbandPage = (path: any) => {
    const [modelMap, setModelMap] = useState<PageMap[]>([]);
    const [state, setState] = useState<Warband>(path.location.state as Warband);
    useEffect(() => {
        setModelMap((map) => [
            ...map,
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) => el.getBoundingClientRect().height + el.getBoundingClientRect().top < 1122).map((element) => ({ "id": element.id, "page": 1 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) =>
                el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 1122 &&
                el.getBoundingClientRect().height + el.getBoundingClientRect().top < 2144
            ).map((element) => ({ "id": element.id, "page": 2 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) =>
                el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 2144).map((element) => ({ "id": element.id, "page": 3 })),
        ]);
    }, []);

    const faction = state.Faction as FactionEnum;
    const rosterPrice = getRosterPrice(state.Roster, faction);
    const filterRosterToPage = (page: number): Model[] => state.Roster.filter((member) => modelMap.find((entry) => entry.id === `modelsheet-${member.name}-${getTotalUnitPrice(member, faction)}` && entry.page === page));
    const getPageCountFromMap = () => modelMap.map((model) => model.page).filter((page, idx, arr) => arr.indexOf(page) === idx).length;
    const renderPages = () => {
        let pages: JSX.Element[] = [];
        for (let i = 1; i <= getPageCountFromMap(); i++) {
            pages = [
                ...pages,
                <WarbandRenderer
                    key={`warband-pdf-rendering-page${i}`}
                    state={{ ...state, Roster: filterRosterToPage(i) }}
                    page={{ nr: i, total: getPageCountFromMap() }}
                    rosterPrice={rosterPrice}
                    stratagems={getStratagems(state)}
                    keywords={getAllKeywords(state.Roster)}
                />,
            ];
        }
        return pages;
    };
    return <div>
        <PdfGenerator title={state.Title} />
        <FileUploader image={
            <img style={{ width: "50px", height: "50px", left: "150px" }} alt="OpenWarband" className="pdf-export" src={ImportWarbandIcon} title="Open another warband from file" />
        } setStateCallback={setState} />
        {modelMap.length ? <div>{renderPages()}</div > : undefined
        }
        <WarbandRenderer state={state} page={{ nr: 1, total: 1 }} rosterPrice={rosterPrice} stratagems={getStratagems(state)} keywords={getAllKeywords(state.Roster)} fullRender={true} />
    </div >;
};
