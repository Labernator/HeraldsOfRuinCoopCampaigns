import * as ArmySpecifics from "../data/ArmySpecifics.json";
import * as EquipmentJson from "../data/Equipment.json";
import * as RulesJson from "../data/Rules.json";
import { ArmySpecificStuff, Equipment, EquipmentReferences, FactionEnum, Model, OtherEquipment, Philosophy, Rule, Weapon } from "../types";
const weapons = EquipmentJson.weapons as Weapon[];
const otherEquipment = EquipmentJson.otherEquipment as OtherEquipment[];
const armyRules = RulesJson.ArmyRules as Rule[];
const rules = RulesJson.rules as Rule[];
const philosophies = RulesJson.Philosophies as Philosophy[];

export const getWeaponDetails = (name: string) => weapons.find((weapon) => weapon.name === name) as Weapon;

export const getFactionSpecifics = (faction: FactionEnum): ArmySpecificStuff => {
    switch (faction) {
        case FactionEnum.PrimarisSpaceMarines: return ArmySpecifics.PrimarisSpaceMarines;
        case FactionEnum.DarkAngels: return ArmySpecifics.DarkAngels;
        case FactionEnum.Tau: return ArmySpecifics.Tau;
        case FactionEnum.AdeptusMechanicus: return ArmySpecifics.AdeptusMechanicus;
        case FactionEnum.Deathwatch: return ArmySpecifics.Deathwatch;
        case FactionEnum.AdeptaSororitas: return ArmySpecifics.AdeptaSororitas;
        default: return { "Keywords": [], "ModelAllowance": { "Core": 0, "Special": 0, "Leader": 0 }, "EquipmentPriceList": [], "UnitPriceList": [] };
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
    getFactionSpecifics(faction).UnitPriceList.find((unit) => unit.name === modelName)?.price || 0
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
    if (model.amount) {
        totalPrice = totalPrice * model.amount;
    }
    return totalPrice;
};

export const getRosterPrice = (models: Model[], faction: FactionEnum) => models.reduce((totalCost, model) => totalCost + getTotalUnitPrice(model, faction), 0);
export const getGlobalRule = (ruleName: string) => armyRules.find((rule) => rule.name === ruleName) as Rule;
export const getRule = (ruleName: string) => rules.find((rule) => rule.name === ruleName) as Rule;
export const getAllKeywords = (models: Model[]) => models.reduce((keywords: string[], model) => [...keywords, ...model.keywords], []).filter((item, idx, array) => array.indexOf(item) === idx).sort();
export const getPhilosophy = (name: string | undefined) => philosophies.find((philosophy) => philosophy.name === name) as Philosophy;
