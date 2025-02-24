"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchEvents, deleteEvent } from "@/lib/store/features/eventSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Pagination,

} from "@mui/material";

function AllEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const { events, loading, error, totalPages } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, limit: 5 }));
  }, [dispatch, currentPage]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/editEvents/${id}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      await dispatch(deleteEvent(id));
      dispatch(fetchEvents({ page: currentPage, limit: 5 }));
    }
  };

  return (
    
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h4" component="h2" align="center" sx={{ mb: 2 }}>
          All Events
        </Typography>

        <Box display="flex" justifyContent="flex-end" sx={{ mb: 3 }}>
          <Link href="/admin/addEvents" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Create an event
            </Button>
          </Link>
        </Box>

        <TableContainer component={Paper} elevation={2}>
          <Table aria-label="events table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Organization</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event._id}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <TableCell align="center">
                    {event.image ? (
                      <Image
                        src={Array.isArray(event.image) ? event.image[0] : event.image}
                        alt={event.title}
                        width={64}
                        height={64}
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      <Typography color="text.secondary">No Image</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{event.title}</TableCell>
                  <TableCell align="center">{event.date}</TableCell>
                  <TableCell align="center">{event.location}</TableCell>
                  <TableCell align="center">{event.organization}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(event._id)}
                      size="small"
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(event._id)}
                      size="small"
                    >
                      <MdDelete />
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

export default AllEvents;