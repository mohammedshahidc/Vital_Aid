

"use client";
import { getallEquipment } from "@/lib/store/features/EquipmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";

const ListEquipments = () => {
    const { allEquipment, isLoading, totalPages } = useAppSelector((state) => state.equipments);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getallEquipment(currentPage));
    }, [dispatch, currentPage]);

    const deleteEquipments = async (id: string) => {
        try {
            await axiosInstance.put(`/equipment/deleteEquipment/${id}`);
            await dispatch(getallEquipment(currentPage));
        } catch (error) {
            axiosErrorManager(error);
        }
    };
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>

            <div className="flex justify-end items-end pr-1 md:pr-16">
                <Link href={"/admin/equipments/add"}>
                    <Button variant="outlined" color="primary">add an equipment</Button>
                </Link>
            </div>
            <div className="w-full flex flex-col items-center overflow-scroll scrollbar-none">

                <Typography variant="h4" color="green" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
                    Equipments
                </Typography>



                {isLoading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <TableContainer component={Paper} sx={{ maxWidth: "90%", overflowX: "auto" }}>
                        <Table>

                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell><strong>Image</strong></TableCell>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Available</strong></TableCell>
                                    <TableCell><strong>Description</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {allEquipment?.map((equipment) => (
                                    <TableRow key={equipment._id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>

                                        <TableCell>
                                            <Image
                                                src={equipment.image}
                                                alt={equipment.name}
                                                width={100}
                                                height={100}
                                                objectFit="cover"
                                                style={{ borderRadius: "8px" }}
                                            />
                                        </TableCell>


                                        <TableCell>
                                            <Typography variant="body1" fontWeight="bold">
                                                {equipment.name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>{equipment.quantity}</TableCell>

                                        <TableCell sx={{ maxWidth: 300, wordWrap: "break-word" }}>
                                            {equipment.description}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton onClick={() => deleteEquipments(equipment._id)} color="error">
                                                <MdDeleteForever />
                                            </IconButton>
                                            <Link href={`/admin/equipments/edit/${equipment._id}`}>
                                                <IconButton color="primary">
                                                    <RiEdit2Fill />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

        </>

    );
};

export default ListEquipments;
