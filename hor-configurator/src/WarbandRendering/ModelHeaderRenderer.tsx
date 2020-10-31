import React from "react";
import { FactionEnum, Model } from "../types";
import { getModelType, getTotalUnitPrice } from "../utility/Utils";

export const ModelHeaderRenderer = ({ model, faction }: { model: Model; faction: FactionEnum }) => {
    const unitPrice = getTotalUnitPrice(model, faction);
    const priceString = unitPrice ? `(${unitPrice})` : "";
    const amountString = model.amount ? `${model.amount}x ` : "";
    return <div className="container-header">
        <div style={{ float: "left", width: "75%" }}> {`${amountString} ${model.name} ${priceString}`}</div>
        <div style={{ float: "right", width: "calc(25% - 30px)", paddingRight: "15px", textAlign: "right" }}>{`${getModelType(model, faction)}`}</div>
    </div>;
};
