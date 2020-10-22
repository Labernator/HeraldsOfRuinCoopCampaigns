import React from "react";
import { Rule } from "../types";

export const RulesRenderer = ({ rules }: { rules: Rule[] }) => {
    const renderRules = () => rules?.map((rule) =>
        <tr>
            <td>{rule.name}</td>
            <td>{rule.effect}</td>
        </tr>);
    return <table className="enemies-table">
        <colgroup>
            <col style={{ width: "90px" }} />
            <col style={{ width: "360px" }} />
        </colgroup>
        <thead>
            <tr>
                <th>Rule</th>
                <th>Effect</th>
            </tr>
        </thead>

        <tbody>
            {renderRules()}
        </tbody>
    </table>;
}