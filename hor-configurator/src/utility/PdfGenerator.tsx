import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import { ExportWarbandIcon } from "../icons";
export const PdfGenerator = ({ title }: { title: string }) => {

    const exportPdf = async () => {
        const jsPdf = new jsPDF("p", "mm", "a4");
        let canvas: HTMLCanvasElement;
        const container = Array.from(document.querySelectorAll(".pdf-container"));
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < container.length; i++) {
            if (i > 0) {
                jsPdf.addPage();
            }
            // tslint:disable-next-line: await-promise
            canvas = await html2canvas(container[i] as unknown as HTMLElement, { scale: 4, letterRendering: true });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());

        }
        jsPdf.save(`${title}.pdf`);
    };

    return <div id="pdf-generator" className="pdf-generator">
        <img
            src={ExportWarbandIcon}
            className="pdf-export"
            id={"pdf-generator-icon"}
            title={"GeneratePdf"}
            alt={"GeneratePdfIcon"}
            onClick={exportPdf}>
        </img>
    </div>;
};
