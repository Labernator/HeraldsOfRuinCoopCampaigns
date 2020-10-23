import React from "react";
import { EquipmentReferences, FactionEnum, OtherEquipment, Weapon } from "../types";
import { getDetailedList, getWeaponPrice } from "../utility/Utils";

export const ModelEquipmentRenderer = ({ equipment, faction }: { equipment: EquipmentReferences; faction: FactionEnum }) => {
    const equiList = getDetailedList(equipment);
    const hasMeleeWeaponsOnly = () => equiList.weapons.every((weapon) => weapon.type === "Melee");
    const weaponPriceString = (weapon: Weapon) => getWeaponPrice(weapon.name, faction, weapon.amount) ? `(${getWeaponPrice(weapon.name, faction, weapon.amount)})` : "";
    const otherEquipmentPriceString = (otherEquipment: OtherEquipment) => otherEquipment.price ? `(${otherEquipment.price})` : "";
    const renderMultiProfiles = (multiProfiles: Weapon[]) => multiProfiles.map(renderWeaponLine);
    const renderWeaponLine = (weapon: Weapon) =>
        <tr>
            <td>{` - ${weapon.name} ${weaponPriceString(weapon)}`}</td>
            <td>{weapon.type}</td>
            {!hasMeleeWeaponsOnly() ? <td>{weapon.range}</td> : undefined}
            <td>{weapon.strength}</td>
            <td>{weapon.ap}</td>
            <td>{weapon.damage}</td>
            <td>{weapon.rule}</td>
        </tr>;

    const renderWeapons = () => equiList.weapons.map((weapon) => weapon.multiProfiles ?
        [<tr>
            <td colSpan={4}>{`${weapon.name} ${weaponPriceString(weapon)}`}</td>
        </tr>,
        renderMultiProfiles(weapon.multiProfiles)]
        :
        [<tr>
            <td>{`${weapon.name} ${weaponPriceString(weapon)}`}</td>
            <td>{weapon.type}</td>
            {!hasMeleeWeaponsOnly() ? <td>{weapon.range}</td> : undefined}
            <td>{weapon.strength}</td>
            <td>{weapon.ap}</td>
            <td>{weapon.damage}</td>
            <td>{weapon.rule}</td>
        </tr>]
    );
    const renderOtherEquipment = () => equiList.otherEquipment?.map((otherEquipment) =>
        <tr>
            <td>{`${otherEquipment.name} ${otherEquipmentPriceString(otherEquipment)}`}</td>
            <td>{otherEquipment.effect}</td>
        </tr>);
    return <div><table className="enemies-table">
        <colgroup>
            <col style={{ width: "100px" }} />
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "45px" }} /> : <col style={{ width: "20px" }} />}
            <col style={{ width: "20px" }} />
            <col style={{ width: "20px" }} />
            <col style={{ width: "20px" }} />
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "20px" }} /> : <col style={{ width: "252px" }} />}
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "180px" }} /> : undefined}
        </colgroup>
        <thead>
            <tr>
                <th>Weapons</th>
                <th>Type</th>
                {!hasMeleeWeaponsOnly() ? <th>Rng</th> : undefined}
                <th>Str</th>
                <th>AP</th>
                <th>Dmg</th>
                <th>Rule</th>
            </tr>
        </thead>

        <tbody>
            {renderWeapons()}
        </tbody>
    </table>
        {equipment.otherEquipment ? <table className="enemies-table">
            <colgroup>
                <col style={{ width: "100px" }} />
                <col style={{ width: "362px" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Equipment</th>
                    <th>Effect</th>
                </tr>
            </thead>

            <tbody>
                {renderOtherEquipment()}
            </tbody>
        </table> : undefined}
    </div>;
};
