import * as AdeptaSororitasArmySpecific from "../data/armySpecifics/AdeptaSororitas.json";
import * as AdeptusMechanicusArmySpecific from "../data/armySpecifics/AdeptusMechanicus.json";
import * as DarkAngelsArmySpecific from "../data/armySpecifics/DarkAngels.json";
import * as PrimarisArmySpecifics from "../data/armySpecifics/PrimarisSpaceMarines.json";
import * as TauArmySpecifics from "../data/armySpecifics/Tau.json";
import * as EquipmentJson from "../data/Equipment.json";
import * as RulesJson from "../data/Rules.json";
import { ArmySpecificStuff, Equipment, EquipmentReferences, FactionEnum, Model, OtherEquipment, Philosophy, Rule, Weapon } from "../types";
const weapons = EquipmentJson.weapons as Weapon[];
const otherEquipment = EquipmentJson.otherEquipment as OtherEquipment[];
const armyRules = RulesJson.ArmyRules as Rule[];
const rules = RulesJson.rules as Rule[];
const philosophies = RulesJson.Philosophies as Philosophy[];

export const getWeaponDetails = (name: string) => weapons.find((weapon) => weapon.name.toLocaleUpperCase() === name.toLocaleUpperCase()) as Weapon;

export const getFactionSpecifics = (faction: FactionEnum): ArmySpecificStuff => {
    switch (faction) {
        case FactionEnum.AdeptaSororitas: return AdeptaSororitasArmySpecific.AdeptaSororitas;
        case FactionEnum.AdeptusMechanicus: return AdeptusMechanicusArmySpecific.AdeptusMechanicus;
        case FactionEnum.DarkAngels: return DarkAngelsArmySpecific.DarkAngels;
        case FactionEnum.PrimarisSpaceMarines: return PrimarisArmySpecifics.PrimarisSpaceMarines;
        case FactionEnum.Tau: return TauArmySpecifics.Tau;
        // case FactionEnum.Deathwatch: return ArmySpecifics.Deathwatch;
        default: return { "Keywords": [], "Philosophies": [], "AlignmentPlaceholder": "", "ModelAllowance": { "Core": 0, "Special": 0, "Leader": 0 }, "WeaponPriceList": [], "UnitList": [] };
    }
};

export const getWeaponPrice = (weaponName: string, faction: FactionEnum, amount?: number) => {
    if (getWeaponDetails(weaponName)?.isLegendary) {
        return 20;
    }
    return (getFactionSpecifics(faction).WeaponPriceList.find((weapon) => weapon.name === weaponName)?.price || 0) * (amount || 1);
};

export const getOtherEquipmentDetails = (name: string) =>
    otherEquipment.find((equi) => equi.name.toLocaleUpperCase() === name.toLocaleUpperCase()) as OtherEquipment;
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
            const ruleDetails = getRule(rule, faction);
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
export const getRule = (ruleName: string, faction: FactionEnum, alignment?: string): Rule => {
    let actualRule = rules.find((rule) => rule.name.toLocaleUpperCase() === ruleName.toLocaleUpperCase());
    if (!actualRule) {
        throw new Error(`Rule ${ruleName} needs to be added to metadata`);
    }
    return actualRule.alignmentParameter && alignment ? actualRule = { ...actualRule, effect: actualRule.effect.replace(getFactionSpecifics(faction).AlignmentPlaceholder || "", alignment) } : actualRule;
};
export const getAllKeywords = (models: Model[], faction: FactionEnum) => models.reduce((keywords: string[], model) => [...keywords, ...getModelKeywords(model, faction)], []).filter((item, idx, array) => array.indexOf(item) === idx).sort();
export const getPhilosophy = (name: string, faction: FactionEnum) => {
    let phil = philosophies.find((philosophy) => philosophy.name.toLocaleUpperCase() === name?.toLocaleUpperCase());
    if (!phil) {
        phil = getFactionSpecifics(faction).Philosophies.find((philosophy) => philosophy.name.toLocaleUpperCase() === name?.toLocaleUpperCase());
        if (!phil) {
            throw new Error(`Philosophy ${name} needs to be added to metadata`);
        }
    }
    return phil;
};

export const getBaseModel = (model: Model, faction: FactionEnum) => getFactionSpecifics(faction).UnitList.find((unit) => unit.name.toLocaleUpperCase() === model.name.toLocaleUpperCase());
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

export const getRealModel = (model: Model, faction: FactionEnum, alignment?: string): Model => alignment ? {
    ...model,
    stats: getModelStats(model, faction),
    keywords: getModelKeywords(model, faction).map((keyword) => keyword === getFactionSpecifics(faction).AlignmentPlaceholder ? alignment : keyword),
    rules: getModelRules(model, faction).map((rule) => rule === getFactionSpecifics(faction).AlignmentPlaceholder ? alignment : rule),
} : {
        ...model,
        stats: getModelStats(model, faction),
        keywords: getModelKeywords(model, faction),
        rules: getModelRules(model, faction),
    };
