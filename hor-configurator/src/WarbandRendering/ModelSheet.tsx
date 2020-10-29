import React from "react";
import { FactionEnum, Model } from "../types";
import { getRule, getTotalUnitPrice } from "../utility";
import { ModelEquipmentRenderer } from "./ModelEquipment";
import { ModelHeaderRenderer } from "./ModelHeaderRenderer";
import { ModelKeywordRenderer } from "./ModelKeywords";
import { ModelRulesRenderer } from "./ModelRules";
import { ModelStatsRenderer } from "./ModelStats";

export const ModelSheetRenderer = ({ model, faction, skipKeywords }: { model: Model; faction: FactionEnum; skipKeywords?: boolean }) =>
    <div id={`modelsheet-${model.name}-${getTotalUnitPrice(model, faction)}`} className="quick-ref-enemies-container model-container">
        <ModelHeaderRenderer model={model} faction={faction} />
        <ModelStatsRenderer name={model.name} stats={model.stats} />
        {model.equipment ? <ModelEquipmentRenderer equipment={model.equipment} faction={faction} /> : undefined}
        {model.rules ? <ModelRulesRenderer rules={model.rules.map(getRule)} /> : undefined}
        {skipKeywords ? undefined : <ModelKeywordRenderer keywords={model.keywords} />}
    </div>;
