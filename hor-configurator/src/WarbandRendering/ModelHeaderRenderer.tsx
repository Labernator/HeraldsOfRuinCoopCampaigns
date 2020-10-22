import React from "react";
import { FactionEnum, Model } from "../types";
import { getTotalUnitPrice } from "../utility/Utils";

export const ModelHeaderRenderer = ({ model, faction }: { model: Model; faction: FactionEnum }) => {
    const unitPrice = getTotalUnitPrice(model, faction);
    const priceString = unitPrice ? `(${unitPrice})` : "";
    const amountString = model.amount ? `${model.amount}x ` : "";
    const kindString = model.kind ? ` - ${model.kind}` : "";
    return <div className="enemies-header">
        <div style={{ float: "left", width: "75%" }}> {`${amountString} ${model.name} ${kindString} ${priceString}`}</div>
        <div style={{ float: "right", width: "calc(25% - 30px)", paddingRight: "15px", textAlign: "right" }}>{`${model.type}`}</div>
    </div>;
};
