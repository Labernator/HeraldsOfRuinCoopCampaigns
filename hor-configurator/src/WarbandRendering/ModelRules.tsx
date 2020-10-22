import React from "react";
import { Rule } from "../types";

export const ModelRulesRenderer = ({ rules }: { rules: Rule[] }) => {
    const renderRules = () => rules?.map((rule) =>
        <tr key={`rule_${rule.name}`}>
            <td>{rule.name}</td>
            <td>{rule.effect}</td>
        </tr>);
    return <table className="enemies-table">
        <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "305px" }} />
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
};
