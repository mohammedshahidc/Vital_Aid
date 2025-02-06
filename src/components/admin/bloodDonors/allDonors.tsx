"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteDonor, fetchDonors } from "@/lib/store/features/donorsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Paper,
} from "@mui/material";

function AllDonors() {
  const { donors, loading, error, totalPages } = useAppSelector(
    (state) => state.donors
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDonors(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/editDonors/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor?"
    );
    if (confirmDelete) {
      await dispatch(deleteDonor(id));
      dispatch(fetchDonors(1));
    }
  };

  if (loading)
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

  if (error)
    return (
      <Box m={2}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );

  return (
    
      <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          All Donors
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Link href="/admin/addDonors" passHref>
            <Button variant="contained" color="primary">
              Add a Donor
            </Button>
          </Link>
        </Box>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor._id} hover>
                  <TableCell>
                    {donor.image && donor.image.length > 0 ? (
                      <Image
                        src={donor.image[0]}
                        alt={donor.name}
                        width={64}
                        height={64}
                        style={{ borderRadius: "8px", objectFit: "cover" }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No Image
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.BloodGroup}</TableCell>
                  <TableCell>{donor.Phone}</TableCell>
                  <TableCell>{donor.Gender}</TableCell>
                  <TableCell>{donor.Age}</TableCell>
                  <TableCell>{donor.Address}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(donor._id)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(donor._id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
  
  );
}

export default AllDonors;
