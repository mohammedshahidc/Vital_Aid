"use client";

import AddReportModal from "@/components/ui/addDetail";
import { useFetchreport } from "@/lib/Query/hooks/useReport";
import { useAppSelector } from "@/lib/store/hooks";
import { Button, CardContent } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Report } from "../dashbord/reportsection";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ReportModal from "@/components/ui/report";

function ReportAI() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { reports } = useFetchreport(user?.id ?? "");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  console.log(reports);
  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case " 🟢 ":
        return "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500";
      case " 🟡 ":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500";
      case " 🔴 ":
        return "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-red-500";
      case " ⚠️ ":
        return "bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-600";
      default:
        return "bg-gray-100 border-l-4 border-gray-400";
    }
  };
  return (
    <div className="min-h-screen px-4 md:px-10">
    <div className="bg-gray-50 w-full flex items-center justify-center p-6 md:p-10 rounded-3xl mt-20 md:mt-32 py-16 md:py-20 shadow-sm">
  <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 w-full max-w-7xl">
  
    <div className="w-full md:w-1/2 text-center md:text-left px-2 md:px-0 mx-auto md:mx-24">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
        Feeling off? <br />
        Let AI check what your body’s trying to say
      </h1>
      <p className="mt-4 text-gray-600">
        Our advanced AI system analyzes your symptoms for faster, more
        accurate health insights.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Check It!
      </button>
    </div>

    <div className="w-full md:w-1/2 flex justify-center">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image
          src="/brain.jpg"
          alt="AI Health Analysis"
          width={300}
          height={300}
          className="rounded-xl object-cover w-full h-full"
        />
      </div>
    </div>

  </div>
</div>

      <h1 className="px-4 pt-4 text-2xl font-semibold text-gray-500">Previous Reports</h1>
      <CardContent className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto scrollbar-none p-4">
        {reports.length > 0 ? (
          reports
            .slice()
            .sort(
              (a: Report, b: Report) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((reportItem: Report) => {
              return (
                reportItem.healthstatus && (
                  <div
                    key={reportItem._id}
                    className={`h-20 rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                      reportItem.healthstatus
                    )}`}
                    onClick={() => handleReportClick(reportItem)}
                  >
                    <div className="flex justify-between items-center pt-2">
                      <div className="font-medium pt-3">
                        {"Report of " +
                          new Date(reportItem.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs bg-white/70 rounded-full px-2 py-1 shadow-sm ">
                        {new Date(reportItem.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )
              );
            })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <MedicalServicesIcon
              style={{ fontSize: 40 }}
              className="text-gray-300 mb-2"
            />

            <Button
              variant="text"
              size="small"
              color="success"
              className="mt-2"
              onClick={() => setIsModalOpen(true)}
              sx={{ textTransform: "none" }}
            >
              Create your first report
            </Button>
          </div>
        )}
      </CardContent>
      <AddReportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={selectedReport}
      />
    </div>
  );
}

export default ReportAI;
