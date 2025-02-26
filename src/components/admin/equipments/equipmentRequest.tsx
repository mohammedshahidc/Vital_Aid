"use client"
import React, { useEffect, useState } from 'react'
import { Request } from '@/lib/store/features/requestSlice';
import Image from 'next/image';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    NativeSelect,
    InputLabel,
    FormControl,
    Box,
    Pagination,
} from "@mui/material";
import { useAllRequest } from '@/lib/Query/hooks/useRequest';
import axiosInstance from '@/utils/axios';
import axiosErrorManager from '@/utils/axiosErrormanager';

const EquipmentRequest = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filteredRequest, setfilteredRequest] = useState<Request[]| null>(null)
    // const [status, setStaus] = useState<string>('')
    const [selector, setSelector] = useState<string>('')
    const { data, isLoading, error, refetch } = useAllRequest(currentPage)
    const allrequest: Request[] = data?.data
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };

    const handlestatus = async (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        try {
            const newStatus = e.target.value
            // setStaus(newStatus)
            await axiosInstance.put(`/admin/updateequipmentrequest/${id}`, { status: newStatus })
            refetch()
        } catch (error) {
            console.log(error);
            axiosErrorManager(error)
        }
    }
    useEffect(() => {
        if(allrequest){
            if(selector=="all"){
                setfilteredRequest(null)
            }else{
                const filter=allrequest.filter((req)=>req.status==selector)
                setfilteredRequest(filter)
            }
          
        }
      
    }, [selector,allrequest])

    return (
        <div>
            <>
                <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>

                    <div className="w-full flex flex-col items-center overflow-scroll scrollbar-none">

                        <Typography variant="h4" color="green" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
                            Requests For Equipments
                        </Typography>



                        <div className='flex justify-between mb-3 w-[90%] '>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Status
                                    </InputLabel>
                                    <NativeSelect
                                        onChange={(e)=>setSelector(e.target.value)}
                                        inputProps={{
                                            name: 'status',
                                            defaultValue:"all",
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value="all">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>

                        {isLoading ? (
                            <CircularProgress color="primary" />
                        ) : error ? (
                            <Box sx={{ mt: 2, p: 2, bgcolor: "red", color: "white", borderRadius: 1 }}>
                                <Typography variant="body1">
                                    Error: {error.message || "Something went wrong. Please try again later."}
                                </Typography>
                            </Box>
                        ) : (
                            <TableContainer component={Paper} elevation={2}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell><strong>User Name</strong></TableCell>
                                            <TableCell><strong>Image</strong></TableCell>
                                            <TableCell><strong>Equipment</strong></TableCell>
                                            <TableCell><strong>Address</strong></TableCell>
                                            <TableCell align="center"><strong>Status</strong></TableCell>
                                            <TableCell align="center"><strong>Update Status</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(filteredRequest &&filteredRequest?filteredRequest: allrequest).map((req) => (
                                            <TableRow key={req._id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                                                <TableCell>{req.user?.name}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        src={req.equipment?.image || 'equipmentimage.png'}
                                                        alt={req.equipment?.name || 'equipment name'}
                                                        width={100}
                                                        height={100}
                                                        objectFit="cover"
                                                        style={{ borderRadius: "8px" }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {req.equipment?.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 300, wordWrap: "break-word" }}>
                                                    {req.location}
                                                </TableCell>
                                                <TableCell align="center" sx={{
                                                    color: req.status === 'pending' ? 'orange' :
                                                        req.status === 'accepted' ? 'blue' :
                                                            req.status === 'delivered' ? 'green' :
                                                                req.status === 'cancelled' ? 'red' : 'black',
                                                    fontWeight: "bold"
                                                }}>
                                                    {req.status}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <FormControl fullWidth>
                                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                            Status
                                                        </InputLabel>
                                                        <NativeSelect
                                                            onChange={(e) => handlestatus(e, req._id)}
                                                            inputProps={{
                                                                name: 'status',
                                                                defaultValue: req.status || 'pending',
                                                                id: 'uncontrolled-native',
                                                            }}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="accepted">Accepted</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </NativeSelect>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                            <Pagination
                                count={data?.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </Box>
                    </div>
                </Box>

            </>
        </div>
    )
}

export default EquipmentRequest
