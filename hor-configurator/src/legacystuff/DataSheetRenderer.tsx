import React from "react";
import { Enemy } from "../types";
import { ModelKeywordRenderer } from "../WarbandRendering/ModelKeywords";
import { ModelStatsRenderer } from "../WarbandRendering/ModelStats";
import { EnemyHeaderRenderer } from "./EnemyHeaderRenderer";
import { EquipmentRenderer } from "./EquipmentRenderer";
import { RulesRenderer } from "./RulesRenderer";

export const DataSheetRenderer = ({ enemy, skipKeywords }: { enemy: Enemy; skipKeywords?: boolean }) => <div className="quick-ref-enemies-container">
    <EnemyHeaderRenderer model={enemy} />
    <div className="enemy-type">{`${enemy.type}`}</div>
    <ModelStatsRenderer name={enemy.name} stats={enemy.stats} />
    <EquipmentRenderer equipment={enemy.equipment} />

    {enemy.rules ? <RulesRenderer rules={enemy.rules} /> : undefined}
    {skipKeywords ? undefined : <ModelKeywordRenderer keywords={enemy.keywords} />}

</div>;
