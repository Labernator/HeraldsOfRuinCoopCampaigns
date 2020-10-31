import React from "react";
import { getGlobalRule } from "../utility/Utils";

export const ArmyRulesHeaderRenderer = ({ armyRules }: { armyRules: string[] | undefined }) => {
    const renderGlobalRules = (rules: string[]) =>
        rules.map((rule) => {
            const globalRule = getGlobalRule(rule);
            return <div key={`rule_${globalRule?.name}`} className="split-div">
                <div className="split-div-header">{globalRule?.name}</div>
                <div className="split-div-text">{globalRule?.effect}</div>
            </div>;
        });
    return armyRules && armyRules.length > 0 ? <div className="quick-ref-enemies-container">
        <div className="container-header">Army wide rules:</div>
        {renderGlobalRules(armyRules)}
    </div> : null;
};
