import React from "react";
import { ModelStats } from "../types";

export const ModelStatsRenderer = ({ name, stats }: { name: string; stats: ModelStats | ModelStats[] }) => {
    const renderAtomicStats = (characteristics: ModelStats, firstOfMany?: boolean) => <tr>
        {firstOfMany ? <td rowSpan={2} style={{ paddingTop: "15px" }}>{name}</td> : firstOfMany === false ? undefined : <td>{name}</td>}
        <td>{characteristics.Movement}</td>
        <td>{characteristics.WeaponSkill}</td>
        <td>{characteristics.BallisticSkill}</td>
        <td>{characteristics.Strength}</td>
        <td>{characteristics.Toughness}</td>
        <td>{characteristics.Wounds}</td>
        <td>{characteristics.Attacks}</td>
        <td>{characteristics.Leadership}</td>
        <td>{characteristics.Save}</td>
        <td>{characteristics.InvulnerableSave}</td>
    </tr>;
    const renderStats = () => Array.isArray(stats) ? stats.map((characteristics, idx) => renderAtomicStats(characteristics, idx === 0)) : renderAtomicStats(stats);
    return <table className="enemies-table">
        <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "25px" }} />
            <col style={{ width: "80px" }} />
        </colgroup>
        <thead>
            <tr>
                <td>Name</td>
                <td>M</td>
                <td>WS</td>
                <td>BS</td>
                <td>S</td>
                <td>T</td>
                <td>W</td>
                <td>A</td>
                <td>LD</td>
                <td>Sv</td>
                <td>Is</td>
            </tr>
        </thead>
        <tbody>
            {renderStats()}
        </tbody>
    </table>;
};
