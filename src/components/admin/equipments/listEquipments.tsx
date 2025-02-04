// "use client"
// import { getallEquipment } from '@/lib/store/features/EquipmentSlice';
// import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
// import React, { useEffect } from 'react'
// import Image from 'next/image';
// import { MdDeleteForever } from "react-icons/md";
// import { RiEdit2Fill } from "react-icons/ri";
// import Link from 'next/link';
// import axiosInstance from '@/utils/axios';
// import axiosErrorManager from '@/utils/axiosErrormanager';

// const ListEquipments = () => {
//     const { allEquipment, isLoading } = useAppSelector((state) => state.equipments)
//     const dispatch = useAppDispatch()
//     useEffect(() => {
//         dispatch(getallEquipment())
//     }, [])
    
//     const deleteEquipments = async (id: string) => {
//         try {
//             await axiosInstance.put(`/equipment/deleteEquipment/${id}`)
//             await dispatch(getallEquipment())
//         } catch (error) {
//             axiosErrorManager(error)
//         }
//     }
//     return (
//         <div className='w-full h-fit flex flex-col px-2 justify-center items-center overflow-y-scroll scrollbar-none'>
//             <h1 className='text-green-700 text-lg font-bold'>Equipments</h1>
//             {isLoading && <p className="text-blue-500 font-bold">Loading...</p>}
//             {allEquipment && allEquipment.map((equipment) => (
//                 <div className='relative flex h-fit p-2 w-full' key={equipment._id}>
//                     <div className='flex space-x-2 absolute right-8 mt-1'>
//                         <MdDeleteForever className='text-red-800 text-xl' onClick={() => deleteEquipments(equipment._id)} />
//                         <Link href={`/admin/equipments/edit/${equipment._id}`}>
//                             <RiEdit2Fill className='text-blue-800 text-xl' />
//                         </Link>
//                     </div>
//                     <div className='flex justify-center  items-center  w-1/4 bg-geay-200 p-2 '>
//                         <Image
//                             src={equipment.image}
//                             alt={equipment.name}
//                             width={150}
//                             height={150}
//                             objectFit="cover"
//                         />
//                     </div>
//                     <div className='h-fit w-3/4 bg-gray-200 text-gray-600 p-4 overflow-y-scroll scrollbar-none rounded-lg'>
//                         <p className='font-extrabold text-2xl font-serif '>{equipment.name}</p>
//                         <p><span className='font-bold'>Available :</span> {equipment.quantity}</p>
//                         <p className='break-words'><span className='font-bold'>Description :</span> {equipment.description}</p>
//                     </div>
//                 </div>
//             ))}


//         </div>
//     )
// }

// export default ListEquipments


"use client";
import { getallEquipment } from "@/lib/store/features/EquipmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
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
} from "@mui/material";

const ListEquipments = () => {
  const { allEquipment, isLoading } = useAppSelector((state) => state.equipments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getallEquipment());
  }, []);

  const deleteEquipments = async (id: string) => {
    try {
      await axiosInstance.put(`/equipment/deleteEquipment/${id}`);
      await dispatch(getallEquipment());
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center overflow-scroll scrollbar-none">
      <Typography variant="h4" color="green" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
        Equipments
      </Typography>

      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: "90%", overflowX: "auto" }}>
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Available</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {allEquipment?.map((equipment) => (
                <TableRow key={equipment._id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                  {/* Equipment Image */}
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

                  {/* Equipment Name */}
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      {equipment.name}
                    </Typography>
                  </TableCell>

                  {/* Available Quantity */}
                  <TableCell>{equipment.quantity}</TableCell>

                  {/* Description */}
                  <TableCell sx={{ maxWidth: 300, wordWrap: "break-word" }}>
                    {equipment.description}
                  </TableCell>

                  {/* Actions (Edit & Delete) */}
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
    </div>
  );
};

export default ListEquipments;
