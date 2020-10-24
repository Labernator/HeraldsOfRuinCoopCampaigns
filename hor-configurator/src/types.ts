// Warband Interface

export interface Warband {
    Title: string;
    Faction: string;
    NthScenario: number;
    Philosophy?: string;
    Roster: Model[];
    ArmyRules?: string[];
}

export enum FactionEnum {
    Primaris = "Primaris",
    DarkAngels = "Dark Angels",
    Tau = "Tau Empire",
    AdeptusMechanicus = "Adeptus Mechanicus",
    AdeptaSororitas = "Adepta Sororitas",
    Deathwatch = "Deathwatch",
    AstraMilitarum = "Astra Militarum",
}

export interface Model {
    name: string;
    amount?: number;
    kind?: string;
    price?: number;
    type: string;
    stats: ModelStats | ModelStats[];
    armyRules?: string[];
    rules?: string[];
    keywords: string[];
    equipment: EquipmentReferences;
}

export interface ModelStats {
    Movement: number;
    WeaponSkill: string;
    BallisticSkill: string;
    Strength: number;
    Attacks: number;
    Toughness: number;
    Wounds: string | number;
    Leadership: number;
    Save: string;
    InvulnerableSave: string;
}

export interface EquipmentReferences {
    weapons: WeaponReference[];
    otherEquipment?: string[];
}
export interface WeaponReference {
    name: string;
    amount?: number;
}

// Weapons interface

export interface Weapon {
    name: string;
    type?: string;
    strength?: string | number;
    damage?: string | number;
    ap?: string | number;
    range?: number;
    rule?: string;
    isArmouryItem?: boolean;
    price?: number;
    amount?: number;
    multiProfiles?: Weapon[];
    isLegendary?: boolean;
}
// Rule interface
export interface Rule {
    name: string;
    effect: string;
    price?: number;
}

export interface Denizens {
    NightMarket: Enemy[];
}
export interface Enemy {
    name: string;
    amount?: number;
    kind?: string;
    price?: number;
    type: string;
    stats: ModelStats;
    rules?: Rule[];
    keywords: string[];
    equipment: Equipment;
}

export interface Equipment {
    weapons: Weapon[];
    otherEquipment?: OtherEquipment[];
}
export interface OtherEquipment {
    name: string;
    effect: string;
    price?: number;
    isArmouryItem?: boolean;
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface ModelAllowance {
    Core: number;
    Special: number;
    Leader: number;
}
export interface TacticalPoints {
    name: string;
    amount: number;
    text: string;
}
export interface Philosophy {
    name: string;
    tp: number;
    text: string;
}

export interface PageMap {
    id: string;
    page: number;
}
