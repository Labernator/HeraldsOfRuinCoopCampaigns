import React from "react";
import { getGlobalRule } from "../utility/Utils";

export const ArmyRulesHeaderRenderer = ({ armyRules }: { armyRules: string[] }) => {
    const renderGlobalRules = () =>
        armyRules.map((rule) => {
            const globalRule = getGlobalRule(rule);
            return <div key={`rule_${globalRule?.name}`} className="global-rules-container">
                <div className="global-rules-name">{globalRule?.name}</div>
                <div className="global-rules-text">{globalRule?.effect}</div>
            </div>;
        });
    return <div className="quick-ref-enemies-container">
        <div className="enemies-header">Army wide rules:</div>
        {renderGlobalRules()}
    </div>;
};
