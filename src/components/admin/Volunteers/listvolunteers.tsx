"use client";
import { getAllvolunteers, searchVolunteers } from "@/lib/store/features/volunteers";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
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
    TextField
} from "@mui/material";
import { debounce } from 'lodash'


const Listvolunteers = () => {
    const { allVolunteers, isLoading, totalPages, searchedVolunteers } = useAppSelector((state) => state.volunteers)
    const dispatch = useAppDispatch()
    console.log('searched:', searchedVolunteers);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>("")
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        if (searchQuery.length > 1) {

            dispatch(searchVolunteers(searchQuery));
        } else if (!searchQuery) {

            dispatch(getAllvolunteers({ page: currentPage, limit: 5 }));
        }
    }, [dispatch, currentPage, searchQuery]);


    // useEffect(() => {
    //     dispatch(getAllvolunteers(currentPage));
    // }, [    currentPage]);

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
                dispatch(getAllvolunteers({ page: currentPage, limit: 5 }));
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
            <div className="flex justify-between mb-3 w-[90%]">
                <div className=" ">
                    <TextField
                        label="Search Volunteers"
                        variant="outlined"
                        onChange={(e) => debouncedSearch(e.target.value)}
                        sx={{ width: { xs: '250px', sm: '300px' }, boxShadow: "none" }}
                    />
                </div>

                <div className="pr-1 mt-4">
                    <Link href="/admin/volunteers/add" passHref>
                        <Button variant="contained" color="success">
                            Add Volunteer
                        </Button>
                    </Link>
                </div>
            </div>
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
                        {(searchedVolunteers && searchedVolunteers?.length > 0 ? searchedVolunteers : allVolunteers)?.map((volunteer) => (
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
