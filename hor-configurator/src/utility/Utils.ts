import * as AdeptaSororitasArmySpecific from "../data/armySpecifics/AdeptaSororitas.json";
import * as AdeptusMechanicusArmySpecific from "../data/armySpecifics/AdeptusMechanicus.json";
import * as DarkAngelsArmySpecific from "../data/armySpecifics/DarkAngels.json";
import * as PrimarisArmySpecifics from "../data/armySpecifics/PrimarisSpaceMarines.json";
import * as TauArmySpecifics from "../data/armySpecifics/Tau.json";
import * as EquipmentJson from "../data/Equipment.json";
import * as RulesJson from "../data/Rules.json";
import { ArmySpecificStuff, Equipment, EquipmentReferences, FactionEnum, Model, OtherEquipment, Philosophy, Rule, WarbandAlignment, Weapon } from "../types";
const weapons = EquipmentJson.weapons as Weapon[];
const otherEquipment = EquipmentJson.otherEquipment as OtherEquipment[];
const armyRules = RulesJson.ArmyRules as Rule[];
const rules = RulesJson.rules as Rule[];
const philosophies = RulesJson.Philosophies as Philosophy[];

export const getWeaponDetails = (name: string) => weapons.find((weapon) => weapon.name === name) as Weapon;

export const getFactionSpecifics = (faction: FactionEnum): ArmySpecificStuff => {
    switch (faction) {
        case FactionEnum.AdeptaSororitas: return AdeptaSororitasArmySpecific.AdeptaSororitas;
        case FactionEnum.AdeptusMechanicus: return AdeptusMechanicusArmySpecific.AdeptusMechanicus;
        case FactionEnum.DarkAngels: return DarkAngelsArmySpecific.DarkAngels;
        case FactionEnum.PrimarisSpaceMarines: return PrimarisArmySpecifics.PrimarisSpaceMarines;
        case FactionEnum.Tau: return TauArmySpecifics.Tau;

        // case FactionEnum.DarkAngels: return ArmySpecifics.DarkAngels;
        // case FactionEnum.Deathwatch: return ArmySpecifics.Deathwatch;
        // case FactionEnum.AdeptaSororitas: return ArmySpecifics.AdeptaSororitas;
        default: return { "Keywords": [], "ModelAllowance": { "Core": 0, "Special": 0, "Leader": 0 }, "EquipmentPriceList": [], "UnitList": [] };
    }
};

export const getWeaponPrice = (weaponName: string, faction: FactionEnum, amount?: number) => {
    if (getWeaponDetails(weaponName)?.isLegendary) {
        return 20;
    }
    return (getFactionSpecifics(faction).EquipmentPriceList.find((weapon) => weapon.name === weaponName)?.price || 0) * (amount || 1);
};

export const getOtherEquipmentDetails = (name: string) =>
    otherEquipment.find((equi) => equi.name === name) as OtherEquipment;
export const getDetailedList = (referenceList: EquipmentReferences) => {
    const detailedList: Equipment = {
        weapons: [],
        otherEquipment: [],
    };
    detailedList.weapons = referenceList.weapons.map((weapon) => {
        const detailedWeapon = getWeaponDetails(typeof weapon === "string" ? weapon : weapon.name);
        if (typeof weapon !== "string" && weapon.amount) {
            detailedWeapon.amount = weapon.amount;
        }
        return detailedWeapon;
    });
    detailedList.otherEquipment = referenceList.otherEquipment?.map(getOtherEquipmentDetails);
    return detailedList;
};
export const getModelPrice = (modelName: string, faction: FactionEnum) =>
    getFactionSpecifics(faction).UnitList.find((unit) => unit.name === modelName)?.price || 0;
export const getTotalUnitPrice = (model: Model, faction: FactionEnum) => {
    let totalPrice = model.price || getModelPrice(model.name, faction) || 0;

    totalPrice = totalPrice + (model.equipment?.weapons.reduce((a, weapon) => a + getWeaponPrice(typeof weapon === "string" ? weapon : weapon.name, faction, typeof weapon === "string" ? undefined : weapon.amount), 0) || 0);
    if (model.equipment?.otherEquipment) {
        totalPrice = totalPrice + model.equipment.otherEquipment.reduce((a, equipment) => {
            const equipmentDetails = getOtherEquipmentDetails(equipment);
            if (equipmentDetails?.price) {
                return a + equipmentDetails.price;
            } return a;
        }, 0);
    }
    const modelRules = getModelRules(model, faction);
    if (modelRules) {
        totalPrice = totalPrice + modelRules.reduce((acc, rule) => {
            const ruleDetails = getRule(rule);
            if (ruleDetails?.price) {
                return acc + ruleDetails.price;
            } return acc;
        }, 0);
    }
    if (model.amount) {
        totalPrice = totalPrice * model.amount;
    }
    return totalPrice;
};

export const getRosterPrice = (models: Model[], faction: FactionEnum) => models.reduce((totalCost, model) => totalCost + getTotalUnitPrice(model, faction), 0);
export const getGlobalRule = (ruleName: string) => armyRules.find((rule) => rule.name === ruleName) as Rule;
export const getRule = (ruleName: string, alignment?: WarbandAlignment): Rule => {
    let actualRule = rules.find((rule) => rule.name === ruleName);
    if (!actualRule) {
        throw new Error(`Rule ${ruleName} needs to be added to metadata`);
    }
    return actualRule.alignmentParameter && alignment ? actualRule = { ...actualRule, effect: actualRule.effect.replace(alignment.replacing, alignment.name) } : actualRule;
};
export const getAllKeywords = (models: Model[], faction: FactionEnum) => models.reduce((keywords: string[], model) => [...keywords, ...getModelKeywords(model, faction)], []).filter((item, idx, array) => array.indexOf(item) === idx).sort();
export const getPhilosophy = (name: string | undefined) => philosophies.find((philosophy) => philosophy.name === name) as Philosophy;

export const getBaseModel = (model: Model, faction: FactionEnum) => getFactionSpecifics(faction).UnitList.find((unit) => unit.name === model.name);
export const getModelKeywords = (model: Model, faction: FactionEnum) => {
    const baseKeywords = getBaseModel(model, faction)?.keywords || [];
    return model.keywords ? [...baseKeywords, ...model.keywords].filter((keyword, idx, array) => array.indexOf(keyword) === idx) : baseKeywords;
};
export const getModelRules = (model: Model, faction: FactionEnum) => {
    const baseRules = getBaseModel(model, faction)?.rules || [];
    return model.rules ? [...baseRules, ...(model.rules || [])].filter((rule, idx, array) => array.indexOf(rule) === idx) : baseRules;
};
export const getModelStats = (model: Model, faction: FactionEnum) => {
    const stats = getBaseModel(model, faction)?.stats || [];
    if (Array.isArray(stats) && Array.isArray(model.stats)) {
        return model.stats ? [...stats, ...model.stats] : stats;
    } else {
        return model.stats ? { ...stats, ...model.stats } : stats;
    }

};
export const getModelType = (model: Model, faction: FactionEnum) => model.type || getBaseModel(model, faction)?.type;

export const getRealModel = (model: Model, faction: FactionEnum, alignment?: WarbandAlignment): Model => alignment ? {
    ...model,
    stats: getModelStats(model, faction),
    keywords: getModelKeywords(model, faction).map((keyword) => keyword === alignment.replacing ? alignment.name : keyword),
    rules: getModelRules(model, faction).map((rule) => rule === alignment.replacing ? alignment.name : rule),
} : {
        ...model,
        stats: getModelStats(model, faction),
        keywords: getModelKeywords(model, faction),
        rules: getModelRules(model, faction),
    }
    ;
