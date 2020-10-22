import React from "react";
import { Equipment, OtherEquipment, Weapon } from "../types";

export const EquipmentRenderer = ({ equipment }: { equipment: Equipment }) => {
    const hasMeleeWeaponsOnly = () => equipment.weapons.every((weapon) => weapon.type === "Melee");
    const stuffPriceString = (stuff: OtherEquipment | Weapon) => stuff.price ? `(${stuff.price})` : "";
    const renderWeapons = () => equipment.weapons.map((weapon) => [<tr>
        <td>{`${weapon.name} ${stuffPriceString(weapon)}`}</td>
        <td>{weapon.type}</td>
        {!hasMeleeWeaponsOnly() ? <td>{weapon.range}</td> : undefined}
        <td>{weapon.strength}</td>
        <td>{weapon.ap}</td>
        <td>{weapon.damage}</td>
        <td>{weapon.rule}</td>
    </tr>]
    );
    const renderOtherEquipment = () => equipment.otherEquipment?.map((equipment) =>
        <tr>
            <td>{`${equipment.name} ${stuffPriceString(equipment)}`}</td>
            <td>{equipment.effect}</td>
        </tr>);
    return <div><table className="enemies-table">
        <colgroup>
            <col style={{ width: "90px" }} />
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "45px" }} /> : <col style={{ width: "20px" }} />}
            <col style={{ width: "20px" }} />
            <col style={{ width: "20px" }} />
            <col style={{ width: "20px" }} />
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "20px" }} /> : <col style={{ width: "252px" }} />}
            {!hasMeleeWeaponsOnly() ? <col style={{ width: "197px" }} /> : undefined}
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
                <col style={{ width: "90px" }} />
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
}