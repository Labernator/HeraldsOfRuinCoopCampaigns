import React from "react";

export const ModelKeywordRenderer = ({ keywords }: { keywords: string[] }) => <div className="enemies-string-container">
    <div style={{ fontWeight: "bold", float: "left" }}>Keywords</div>
    <div style={{ paddingLeft: "192px" }}>{keywords.join(", ")}</div>
</div>;
