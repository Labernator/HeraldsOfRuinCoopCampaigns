import React from "react";
import { FactionEnum, Model } from "../types";
import { getModelKeywords, getModelRules, getModelStats, getRule, getTotalUnitPrice } from "../utility";
import { ModelEquipmentRenderer } from "./ModelEquipment";
import { ModelHeaderRenderer } from "./ModelHeaderRenderer";
import { ModelKeywordRenderer } from "./ModelKeywords";
import { ModelRulesRenderer } from "./ModelRules";
import { ModelStatsRenderer } from "./ModelStats";

export const ModelSheetRenderer = ({ model, faction }: { model: Model; faction: FactionEnum }) =>
    <div id={`modelsheet-${model.name}-${getTotalUnitPrice(model, faction)}`} className="quick-ref-enemies-container model-container">
        <ModelHeaderRenderer model={model} faction={faction} />
        <ModelStatsRenderer name={model.name} stats={getModelStats(model, faction)} />
        {model.equipment ? <ModelEquipmentRenderer equipment={model.equipment} faction={faction} /> : undefined}
        <ModelRulesRenderer rules={getModelRules(model, faction).map(getRule)} />
        <ModelKeywordRenderer keywords={getModelKeywords(model, faction)} />
    </div>;
