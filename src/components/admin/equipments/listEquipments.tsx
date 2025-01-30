"use client"
import { getallEquipment } from '@/lib/store/features/EquipmentSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import React, { useEffect } from 'react'
import Image from 'next/image';
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Link from 'next/link';
import axiosInstance from '@/utils/axios';
import axiosErrorManager from '@/utils/axiosErrormanager';

const ListEquipments = () => {
    const { allEquipment, isLoading} = useAppSelector((state) => state.equipments)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getallEquipment())
    }, [])
    const deleteEquipments=async(id: string)=>{
        try {
            await axiosInstance.put(`/equipment/deleteEquipment/${id}`)
           await dispatch(getallEquipment())
        } catch (error) {
            axiosErrorManager(error)
        }
    }
    return (
        <div className='w-full h-fit flex flex-col px-2 justify-center items-center overflow-y-scroll scrollbar-none'>
            <h1 className='text-green-700 text-lg font-bold'>Equipments</h1>
            {isLoading && <p className="text-blue-500 font-bold">Loading...</p>}
            {allEquipment && allEquipment.map((equipment) => (
                <div className='relative flex h-fit p-2 w-full' key={equipment._id}>
                    <div className='flex space-x-2 absolute right-8 mt-1'>
                       <MdDeleteForever className='text-red-800 text-xl' onClick={()=>deleteEquipments(equipment._id)}/>
                       <Link href={`/admin/equipments/edit/${equipment._id}`}>
                       <RiEdit2Fill className='text-blue-800 text-xl'/>
                       </Link>
                    </div>
                    <div className='flex justify-center  items-center h-28 w-1/4 bg-geay-200 p-2 '>
                        <Image
                            src={equipment.image}
                            alt={equipment.name}
                            width={100} 
                            height={100} 
                            objectFit="cover" 
                        />
                    </div>
                    <div className='h-28 w-3/4 bg-gray-200 text-gray-600 p-4 overflow-y-scroll scrollbar-none rounded-lg'>
                        <p className='font-extrabold text-2xl font-serif '>{equipment.name}</p>
                        <p><span className='font-bold'>Available :</span> {equipment.quantity}</p>
                        <p className='break-words'><span className='font-bold'>Description :</span> {equipment.description}</p>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default ListEquipments
