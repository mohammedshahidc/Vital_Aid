"use client";

import React from "react";
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

type Doctor = {
  _id: string;
  name?: string;
  email: string;
  phone: string;
  isDeleted: boolean;
};

function AllDoctors() {
  const { doctor } = useDoctor();

  if (!doctor?.data) return <p>Loading...</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "id", label: "ID" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

  const rows = doctor.data.map((doc: Doctor) => ({
    key: doc._id,
    name: doc.name || "N/A",
    id:doc._id,
    email: doc.email,
    phone: doc.phone,
    status: doc.isDeleted ? "Deleted" : "Active",
  }));

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Doctors List</h2>
      <Table aria-label="Doctors List">
        <TableHeader columns={columns}>
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
                      href={`/doctors/${item.key}`}
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
    </div>
  );
}

export default AllDoctors;
