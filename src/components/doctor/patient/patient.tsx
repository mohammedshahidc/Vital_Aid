"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useFetchDetails, useFetchreport } from "@/lib/Query/hooks/useReport";



function Patient() {
  const { userid } = useParams() as { userid: string }
  const { details } = useFetchDetails(userid);
  const { reports } = useFetchreport(userid);


  return (
    <div>

    </div>

  )
}

export default Patient;
