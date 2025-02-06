"use client";
import { getAllvolunteers } from "@/lib/store/features/volunteers";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
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
  Pagination,
  Stack,
  Paper,
} from "@mui/material";

const Listvolunteers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { allVolunteers, isLoading, totalPages } = useAppSelector(
    (state) => state.volunteers
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllvolunteers(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const deletevolunteer = async (id: string) => {
    try {
      const response = await axiosInstance.put(`volunteers/delete/${id}`);
      if (response.status == 200) {
        dispatch(getAllvolunteers(currentPage));
      }
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Volunteers
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Link href="/admin/volunteers/add" passHref>
          <Button variant="contained" color="success">
            Add Volunteer
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ borderRadius: 2 }}>
            <TableRow sx={{ backgroundColor: "#f5f5f6" }}>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVolunteers &&
              allVolunteers.map((volunteer) => (
                <TableRow
                  key={volunteer._id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{volunteer._id}</TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {volunteer.name}
                  </TableCell>
                  <TableCell>
                    {volunteer.image ? (
                      <Image
                        src={volunteer.image}
                        alt="Profile"
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "grey.300",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ❓
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{volunteer.gender}</TableCell>
                  <TableCell>{volunteer.phone}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Link href={`/admin/volunteers/edit/${volunteer._id}`}>
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deletevolunteer(volunteer._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Stack>
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
};

export default Listvolunteers;
