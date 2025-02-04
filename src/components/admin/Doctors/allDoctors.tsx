"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDoctor } from "@/lib/Query/hooks/useDoctor";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { Button } from "@mui/material";

type Doctor = {
  _id: string;
  name?: string;
  email: string;
  phone: string;
  isDeleted: boolean;
};

function AllDoctors() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useDoctor(currentPage);


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No doctors found.</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "id", label: "ID" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

  const rows = data?.data.map((doc: Doctor) => ({
    key: doc._id,
    name: doc.name || "N/A",
    id: doc._id,
    email: doc.email,
    phone: doc.phone,
    status: doc.isDeleted ? "Deleted" : "Active",
  }));

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Doctors List</h2>
      <div className="flex justify-end items-end pr-1 md:pr-20">
        <Link href={"/admin/addDoctors"}>
          <Button variant="contained" color="info">Add a doctor</Button>
        </Link>
      </div>

      <Table aria-label="Doctors List">
        <TableHeader columns={columns} className="bg-gray-100">
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: typeof rows[0]) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "name" ? (
                    <Link
                      href={`/admin/doctors/${item.key}`}
                      className="text-blue-600 hover:underline"
                    >
                      {getKeyValue(item, columnKey)}
                    </Link>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 gap-2">
        <Button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        <span className="px-4 py-2">
          Page {currentPage} of {data.totalPages}
        </span>

        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))}
          disabled={currentPage === data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllDoctors;
