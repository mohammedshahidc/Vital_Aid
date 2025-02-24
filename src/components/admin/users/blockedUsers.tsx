"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import axiosInstance from "@/utils/axios";
import BlockIcon from "@mui/icons-material/Block";
import Image from "next/image";
import {
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
  Button,
  Chip,
} from "@mui/material";

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
  profileImage: {
    originalProfile: string;
    thumbnail: string;
  };
}

const BlockedUsersList: React.FC = () => {
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 7 }));
  }, [dispatch]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axiosInstance.get<{ users: User[] }>(
          "/users/getblockedUsers"
        );
        setBlockedUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblockUser = async (_id: string) => {
    try {
      await axiosInstance.post(`/users/blockUser/${_id}`);
      dispatch(fetchUsers({ page: 1, limit: 7 }));
      setBlockedUsers((prev) => prev.filter((user) => user._id !== _id));
    } catch (error) {
      console.error("Error unblocking user:", error);
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
        Blocked Users
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockedUsers.map((user) => (
              <TableRow
                key={user._id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Image
                      src={user.profileImage.thumbnail}
                      alt={user.name}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <Chip
                    icon={<BlockIcon />}
                    label="Blocked"
                    color="error"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUnblockUser(user._id)}
                    size="small"
                  >
                    Unblock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {blockedUsers.length === 0 && !isLoading && (
        <Box mt={4}>
          <Typography variant="body1" color="text.secondary" align="center">
            No blocked users found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlockedUsersList;
