"use client"

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { getallEquipmentforuser } from '@/lib/store/features/EquipmentSlice'
import Image from 'next/image'

const Equipmentsuser = () => {
  const dispatch = useAppDispatch()
  const { allEquipment, totalPages } = useAppSelector((state) => state.equipments)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getallEquipmentforuser(currentPage))
  }, [dispatch, currentPage])

  

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col h-3/4 mt-6 w-full items-center space-y-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEquipment?.map((equipment) => (
          <div key={equipment._id} className="max-w-xs bg-white rounded-xl shadow-md p-4">
            <Image 
              src={equipment.image || "/default-image.jpg"} 
              alt={equipment.name} 
              width={200} 
              height={200} 
              className="w-full h-40 object-contain rounded-t-lg"
            />
            <h2 className="text-lg font-semibold text-green-600 mt-2">{equipment.name}</h2>
            <p className="text-gray-500">Available: <span className="font-semibold">{equipment.quantity}</span></p>
          </div>
        ))}
      </div>

     
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </div>
  )
}

export default Equipmentsuser
