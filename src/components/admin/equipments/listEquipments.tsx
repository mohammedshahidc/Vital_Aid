"use client";
import { getallEquipment, searchEQuipment } from "@/lib/store/features/EquipmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState, useRef } from "react";
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
  Box,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { debounce } from "lodash";
import { IoSearchCircleOutline } from "react-icons/io5";
import CancelIcon from "@mui/icons-material/Cancel";

const ListEquipments = () => {
  const { allEquipment, isLoading, totalPages, searchedEquipments } = useAppSelector(
    (state) => state.equipments
  );
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState<string>("");

  // Use a ref to store the debounced function
  const debouncedSearchRef = useRef(
    debounce((searchTerm: string) => {
      setQuery(searchTerm);
    }, 500)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearchRef.current(value);
  };

  const handleClearSearch = () => {
    setInputValue("");
    debouncedSearchRef.current("");
  };

  useEffect(() => {
    if (query.length > 1) {
      dispatch(searchEQuipment(query));
    } else {
      dispatch(getallEquipment({ page: currentPage, limit: 3 }));
    }
  }, [dispatch, currentPage, query]);

  const deleteEquipments = async (id: string) => {
    try {
      await axiosInstance.put(`/equipment/deleteEquipment/${id}`);
      await dispatch(getallEquipment({ page: currentPage, limit: 3 }));
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <div className="w-full flex flex-col items-center overflow-scroll scrollbar-none">
        <Typography variant="h4" color="green" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
          Equipments
        </Typography>

        <div className="flex justify-between mb-3 w-[90%]">
          <div>
            <TextField
              label="Search Equipments"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
              sx={{ width: { xs: "250px", sm: "300px" }, boxShadow: "none" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearchCircleOutline />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {inputValue && (
                      <IconButton onClick={handleClearSearch}>
                        <CancelIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pr-1 mt-4">
            <Link href={"/admin/equipments/add"}>
              <Button variant="outlined" color="primary">
                add an equipment
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Available</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(
                  searchedEquipments && searchedEquipments.length > 0 && inputValue.length > 0
                    ? searchedEquipments
                    : allEquipment
                )?.map((equipment) => (
                  <TableRow
                    key={equipment._id}
                    sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                  >
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
                      <IconButton
                        onClick={() => deleteEquipments(equipment._id)}
                        color="error"
                      >
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
      </div>
    </Box>
  );
};

export default ListEquipments;
