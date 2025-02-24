"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDoctor } from "@/lib/Query/hooks/useDoctor";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

type raw = {
  key: string;
  name: string;
  email: string;
  id: string;
  phone: string;
  status: string;
};

type Doctor = {
  _id: string;
  name?: string;
  email: string;
  phone: string;
  isDeleted: boolean;
};

function AllDoctors() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useDoctor(currentPage,7);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "id", label: "ID" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6">No doctors found.</Typography>
      </Box>
    );
  }

  const rows = data?.data.map((doc: Doctor) => ({
    key: doc._id,
    name: doc.name || "N/A",
    id: doc._id,
    email: doc.email,
    phone: doc.phone,
    status: doc.isDeleted ? "Deleted" : "Active",
  }));

  return (
    <Box className="p-4 h-full">
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Doctors List
      </Typography>

      <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
        pr={{ xs: 1, md: 3 }}
      >
        <Link href="/admin/addDoctors" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="info">
            Add a doctor
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table aria-label="Doctors List">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    backgroundColor: "grey.100",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: raw) => (
              <TableRow
                key={row.key}
                sx={{ "&:hover": { backgroundColor: "grey.50" } }}
              >
                <TableCell>
                  <Link href={`/admin/doctors/${row.key}`} passHref>
                    <div style={{ textDecoration: "none", color: "#1976d2" }}>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {row.name}
                      </Typography>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    sx={{
                      color:
                        row.status === "Active" ? "success.main" : "error.main",
                      fontWeight: "medium",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))
          }
          disabled={currentPage === data.totalPages}
        >
          Next
        </button>
      </div>
    </Box>
  );
}

export default AllDoctors;
