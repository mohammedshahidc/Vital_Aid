"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import axiosInstance from "@/utils/axios";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Chip,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import toast from "react-hot-toast";

function UsersList() {
  const dispatch = useAppDispatch();
  const { isLoading, error, users, totalPages } = useAppSelector(
    (state) => state.users
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showBlocked, setShowBlocked] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 7 }));
  }, [dispatch, currentPage]);

  const handleBlockUser = async (_id: string) => {
    try {
      const response = await axiosInstance.post(`/users/blockUser/${_id}`);
      console.log(response.data.message);
      dispatch(fetchUsers({ page: currentPage, limit: 7 }));
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await axiosInstance.post("/users/sendmessage", {
        message,
      });
      console.log(response.data);
      setMessage("");
      toast.success("message sent to users");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Filter users based on the switch state
  const filteredUsers = showBlocked
    ? users.filter((user) => user.isDeleted || user.blocked)
    : users;

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

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Users List
      </Typography>
      <div className="flex justify-between">
        <div className="flex">
          <TextField
            label="Enter a message"
            name="name"
            variant="outlined"
            margin="dense"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>send</Button>
        </div>
      </div>
        

      <Box display="flex" justifyContent="space-between" mb={3}>
        <FormControlLabel
          control={
            <Switch
              checked={showBlocked}
              onChange={() => setShowBlocked(!showBlocked)}
              color="primary"
            />
          }
          label="Show Blocked Users"
        />

        <Link href="/admin/blockedList" passHref>
          <Button variant="outlined" color="error">
            Blocked Users
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user?._id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                <Link href={`/admin/usersList/${user?._id}`}>

                  <Box display="flex" justifyContent="center">
                    <Image
                      src={user.profileImage?.thumbnail || "/default-avatar.png"}
                      width={40}
                      height={40}
                      alt={user.name}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    
                  </Box>
                  </Link>

                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">
                  {user.isDeleted || user.blocked ? (
                    <Chip
                      icon={<BlockIcon />}
                      label="Blocked"
                      color="error"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="Active"
                      color="success"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={user.blocked ? "primary" : "error"}
                    onClick={() => handleBlockUser(user._id)}
                    startIcon={user.blocked ? <CheckCircleIcon /> : <BlockIcon />}
                    size="small"
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </Button>
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

export default UsersList;
