import * as ArmySpecifics from "../data/ArmySpecifics.json";
import { FactionEnum, Model, ModelAllowance, TacticalPoints, Warband } from "../types";
import { getAllKeywords, getOtherEquipmentDetails, getTotalUnitPrice, getWeaponDetails } from "./Utils";

const getModelAllowance = (faction: FactionEnum): ModelAllowance => {
    switch (faction) {
        case FactionEnum.Primaris: return ArmySpecifics.ModelAllowance.Primaris;
        case FactionEnum.DarkAngels: return ArmySpecifics.ModelAllowance.DarkAngels;
        case FactionEnum.Tau: return ArmySpecifics.ModelAllowance.Tau;
        case FactionEnum.AdeptusMechanicus: return ArmySpecifics.ModelAllowance.AdeptusMechanicus;
        case FactionEnum.Deathwatch: return ArmySpecifics.ModelAllowance.Deathwatch;
        case FactionEnum.AdeptaSororitas: return ArmySpecifics.ModelAllowance.AdeptaSororitas;
        case FactionEnum.AstraMilitarum: return ArmySpecifics.ModelAllowance.AstraMilitarum;
        default: return { Core: 0, Special: 0, Leader: 0 };
    }
};
const strInNumberText = "Gain 1 TP for taking the maximum number of Core models according to your Model Allowance.";
const creamOfCropText = "Gain 1 TP for taking the maximum number of Special models according to your Model Allowance.";
const countSpecial = (members: Model[]) => members.filter((member) => member.type === "Special").reduce((acc, member) => acc + (member.amount ? member.amount : 1), 0);
const countCore = (members: Model[]) => members.filter((member) => member.type === "Special").reduce((acc, member) => acc + (member.amount ? member.amount : 1), 0);
// const hasOneOfEach = (members: Model[]) => members.some((member) => member.type === "Special") && members.some((member) => member.type === "Core");
const hasTrueHeros = (members: Model[], warband: Warband) => members.filter((member) => getTotalUnitPrice(member, warband.Faction as FactionEnum) >= 100).length;
export const hasArmouryEquipment = (models: Model[]) => models.filter((model) =>
    model.equipment.weapons.some((weapon) => getWeaponDetails(typeof weapon === "string" ? weapon : weapon.name).isArmouryItem) ||
    model.equipment.otherEquipment?.some((equi) => getOtherEquipmentDetails(equi).isArmouryItem)
);

export const getStratagems = (warband: Warband): TacticalPoints[] => {
    let myArr: TacticalPoints[] = [{ name: "Destined For Greatness", amount: warband.NthScenario, text: "Gain 1 TP for including a leader. Add +1 for each game this Leader has taken part in until now" }];
    myArr = countCore(warband.Roster) === getModelAllowance(warband.Faction as FactionEnum).Core ? [...myArr, { name: "Strength In Numbers", amount: 1, text: strInNumberText }] : [...myArr];
    myArr = countSpecial(warband.Roster) === getModelAllowance(warband.Faction as FactionEnum).Special ? [...myArr, { name: "Cream Of The Crop", amount: 1, text: creamOfCropText }] : [...myArr];
    // myArr = hasOneOfEach(warband.Roster) ? [...myArr, {name: "Mind The Boat", amount: 1, text:"Gain 1 TP for each section of your Opus, other than Leaders, from which you have selected the minimum number of models."}] : [...myArr];
    myArr = hasTrueHeros(warband.Roster, warband) ? [...myArr, { name: "Herohammer", amount: hasTrueHeros(warband.Roster, warband), text: "Gain 1 TP for each model in your team which cost 100 points or more" }] : [...myArr];
    myArr = getAllKeywords(warband.Roster).length > 8 ? [...myArr, { name: "Death And Diversity", amount: 1, text: "Gain 1 TP if your team contains 8 or more different Keywords." }] : [...myArr];
    myArr = hasArmouryEquipment(warband.Roster).length === 0 ? [...myArr, { name: "Boots Before Loot", amount: 1, text: "Gain 1 TP if your team does not contain any items from your Opus’ Armoury" }] : [...myArr];
    myArr = hasArmouryEquipment(warband.Roster).length >= 5 ? [...myArr, { name: "Shiny Fingz", amount: 1, text: "Gain 1 TP if your team contains 5 or more Armoury items" }] : [...myArr];
    return myArr;
};
