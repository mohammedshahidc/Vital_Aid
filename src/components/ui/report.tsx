"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { jsPDF } from "jspdf";

type Report = {
    _id: string;
    report: string;
};

type ReportModalProps = {
    open: boolean;
    onClose: () => void;
    report: Report | null;
};

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose, report }) => {
    const handleDownloadPDF = () => {
        if (!report) return;

        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const marginX = 10;
        const marginY = 10;
        const pageWidth = doc.internal.pageSize.width - 2 * marginX;
        const pageHeight = doc.internal.pageSize.height - 2 * marginY;
        const lineHeight = 8;

        let y = marginY + 10;

        doc.rect(marginX, marginY, pageWidth, pageHeight);
        const lines = doc.splitTextToSize(report.report, pageWidth - 10);

        lines.forEach((line: string) => {
            if (y + lineHeight > pageHeight + marginY - 10) {
                doc.addPage();
                doc.rect(marginX, marginY, pageWidth, pageHeight);
                y = marginY + 10;
            }
            doc.text(line, marginX + 5, y);
            y += lineHeight;
        });

        doc.save(`Medical_Report_${report._id}.pdf`);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
            <DialogTitle>Medical Report Details</DialogTitle>
            <DialogContent className="scrollbar-none">
                {report ? (
                    <>
                        <div className="text-gray-700 whitespace-pre-wrap mt-4 " >
                            {report.report}
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button
                                onClick={handleDownloadPDF}
                                color="secondary"
                                variant="contained"
                            >
                                Download as PDF
                            </Button>
                            <Button onClick={onClose} color="primary" variant="contained">
                                Close
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">No report details available</div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
