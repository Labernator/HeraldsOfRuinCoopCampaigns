import React from "react";
import { Enemy } from "../types";

export const EnemyHeaderRenderer = ({ model }: { model: Enemy }) => {
    const getUnitTotalPrice = () => {
        let totalPrice = model.price || 0;
        totalPrice = totalPrice + model.equipment.weapons.reduce((a: any, weapon: any) => {
            if (weapon.price) {
                return a + weapon.price
            } return a;
        }, 0);
        if (model.equipment.otherEquipment) {
            totalPrice = totalPrice + model.equipment.otherEquipment.reduce((a: any, equipment: any) => {
                if (equipment.price) {
                    return a + equipment.price
                } return a;
            }, 0);
        }

        if (model.amount) {
            totalPrice = totalPrice * model.amount;
        }
        return totalPrice ? `(${totalPrice})` : "";
    }
    const getAmountString = () => model.amount ? `${model.amount}x ` : "";
    const getKindString = () => model.kind ? ` - ${model.kind}` : "";
    return <div style={{ float: "left", fontSize: "13px", fontWeight: "bold" }}>
        {`${getAmountString()} ${model.name} ${getKindString()} ${getUnitTotalPrice()}`}
    </div>
};
