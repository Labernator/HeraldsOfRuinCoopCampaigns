import React from "react";
import { EquipmentReferences, OtherEquipment, Weapon, WeaponBaseStats } from "../types";
import { getDetailedList } from "../utility/Utils";

export const ModelEquipmentRenderer = ({ equipment }: { equipment: EquipmentReferences }) => {
    const equiList = getDetailedList(equipment);
    const hasMeleeWeaponsOnly = () => equiList.weapons.every((weapon) => weapon.type === "Melee");
    const stuffPriceString = (stuff: OtherEquipment | Weapon) => stuff.price ? `(${stuff.price})` : "";
    const renderMultiProfiles = (multiProfiles: WeaponBaseStats[]) => multiProfiles.map(renderWeaponLine);
    const renderWeaponLine = (weapon: WeaponBaseStats) => <tr>
        <td>{` - ${weapon.name} ${stuffPriceString(weapon)}`}</td>
        <td>{weapon.type}</td>
        {!hasMeleeWeaponsOnly() ? <td>{weapon.range}</td> : undefined}
        <td>{weapon.strength}</td>
        <td>{weapon.ap}</td>
        <td>{weapon.damage}</td>
        <td>{weapon.rule}</td>
    </tr>;
    const renderWeapons = () => equiList.weapons.map((weapon) => weapon.multiProfiles ?
        [<tr>
            <td colSpan={4}>{`${weapon.name} ${stuffPriceString(weapon)}`}</td>
        </tr>,
        renderMultiProfiles(weapon.multiProfiles)]
        :
        [<tr>
            <td>{`${weapon.name} ${stuffPriceString(weapon)}`}</td>
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
            <td>{`${otherEquipment.name} ${stuffPriceString(otherEquipment)}`}</td>
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
