import React from "react";
import { FactionEnum, Model, ModelStats, WarbandAlignment } from "../types";
import { getRule, getTotalUnitPrice } from "../utility";
import { ModelEquipmentRenderer } from "./ModelEquipment";
import { ModelHeaderRenderer } from "./ModelHeaderRenderer";
import { ModelKeywordRenderer } from "./ModelKeywords";
import { ModelRulesRenderer } from "./ModelRules";
import { ModelStatsRenderer } from "./ModelStats";

export const ModelSheetRenderer = ({ model, faction, alignment }: { model: Model; faction: FactionEnum; alignment?: WarbandAlignment }) =>
    <div id={`modelsheet-${model.name}-${getTotalUnitPrice(model, faction)}`} className="quick-ref-enemies-container model-container">
        <ModelHeaderRenderer model={model} faction={faction} />
        <ModelStatsRenderer name={model.name} stats={model.stats as ModelStats} />
        {model.equipment ? <ModelEquipmentRenderer equipment={model.equipment} faction={faction} /> : undefined}
        <ModelRulesRenderer rules={model.rules?.map((rule) => getRule(rule, alignment))} />
        <ModelKeywordRenderer keywords={model.keywords} />
    </div>;
