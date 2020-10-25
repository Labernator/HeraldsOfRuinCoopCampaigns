import React from "react";
import { EquipmentReferences, FactionEnum, OtherEquipment, Weapon } from "../types";
import { getDetailedList, getWeaponPrice } from "../utility/Utils";

export const ModelEquipmentRenderer = ({ equipment, faction }: { equipment: EquipmentReferences; faction: FactionEnum }) => {
    const equiList = getDetailedList(equipment);
    const weaponPriceString = (weapon: Weapon) => getWeaponPrice(weapon.name, faction, weapon.amount) ? `(${getWeaponPrice(weapon.name, faction, weapon.amount)})` : "";
    const otherEquipmentPriceString = (otherEquipment: OtherEquipment) => otherEquipment.price ? `(${otherEquipment.price})` : "";

    const renderWeapon = (weapon: Weapon, cnt: number) => {
        let arr: JSX.Element[] = [];
        let nr = cnt;
        const weaponName = nr === 1 ? ` - ${weapon.name}` : nr === 2 ? ` -  - ${weapon.name}` : weapon.name;
        if (weapon.multiProfiles) {
            const amountString = weapon.amount && nr === 0 ? `${weapon.amount}x` : "";
            arr = [
                ...arr,
                <tr key={`weapon-table-row-${weapon.name}-${nr}`}>
                    <td>{`${amountString} ${weaponName} ${weaponPriceString(weapon)}`}</td>
                    {weapon.rule ? <td colSpan={6}>{`${weapon.rule}`}</td> : undefined}
                </tr>,
            ];
            nr = nr + 1;
            arr = [...arr, ...weapon.multiProfiles.reduce((acc, weaponPart) => [...acc, ...renderWeapon(weaponPart, nr)], [] as JSX.Element[])];
        } else {
            arr = [...arr, <tr key={`weapon-table-row-${weapon.name}-${nr}`}>
                <td>{`${weaponName} ${weaponPriceString(weapon)}`}</td>
                <td>{weapon.type}</td>
                <td>{weapon.range}</td>
                <td>{weapon.strength}</td>
                <td>{weapon.ap}</td>
                <td>{weapon.damage}</td>
                <td>{weapon.rule}</td>
            </tr>];
        }
        return arr;
    };

    const renderOtherEquipment = () => equiList.otherEquipment?.map((otherEquipment) =>
        <tr key={`weapon-table-row-${otherEquipment.name}`}>
            <td>{`${otherEquipment.name} ${otherEquipmentPriceString(otherEquipment)}`}</td>
            <td>{otherEquipment.effect}</td>
        </tr>);
    return <div>
        <table className="enemies-table">
            <colgroup>
                <col style={{ width: "100px" }} />
                <col style={{ width: "45px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "180px" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Weapons</th>
                    <th>Type</th>
                    <th>Rng</th>
                    <th>Str</th>
                    <th>AP</th>
                    <th>Dmg</th>
                    <th>Rule</th>
                </tr>
            </thead>
            <tbody>
                {equiList.weapons.map((weapon) => renderWeapon(weapon, 0))}
            </tbody>
        </table>
        {equipment.otherEquipment ? <table className="enemies-table">
            <colgroup>
                <col style={{ width: "100px" }} />
                <col style={{ width: "307px" }} />
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
