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
import { Donor } from "@/lib/store/features/donorsSlice";

function AllDonors() {
  const { donors, loading, error, totalPages } = useAppSelector(
    (state) => state.donors
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [group, setgroup] = useState<string>("All")
  const [donorsbygroup, setDonorsbygroup] = useState<Donor[] | null>(null)


  useEffect(() => {
    if (group == "All") {
      setDonorsbygroup(null)
    } else {
      const filterddonor = donors.filter((donor) => donor.BloodGroup == group)
      setDonorsbygroup(filterddonor)
    }
  },[group,donors])
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDonors({ page: currentPage, limit: 5}));
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
      dispatch(fetchDonors({ page: 1, limit: 5 }));
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

      <div className='flex justify-between mb-3 w-full '>
        <div>
          <select
            defaultValue="All"
            onChange={(e) => setgroup(e.target.value)}
            className="h-10 w-28 border rounded-lg focus:ring bg-sky-50"
          >
            <option value="All" >
              All
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>
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
            {(donorsbygroup ? donorsbygroup : donors)?.map((donor) => (
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
