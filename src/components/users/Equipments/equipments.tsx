"use client"

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { Button } from '@mui/material'
import { getallEquipmentforuser } from '@/lib/store/features/EquipmentSlice'
import Image from 'next/image'
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Equipmentsuser = () => {
  const dispatch = useAppDispatch()
  const { allEquipment, totalPages } = useAppSelector((state) => state.equipments)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getallEquipmentforuser(currentPage))
  }, [dispatch, currentPage])

  useEffect (() => {
    AOS.init({duration:1000})
  },[])

  const handlePageChange = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
    {/* Responsive Equipment Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {allEquipment?.map((equipment) => (
        <Link key={equipment._id} href={`/user/equipments/detailes/${equipment._id}`}>
          <div
            className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 to-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            style={{ height: '300px' }}
            data-aos="fade-up" // Increased height
          >
            <div className="relative">
              <Image
                src={equipment.image}
                width={200} // Slightly larger image
                height={200}
                alt={equipment.name}
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-4 text-green-800">
              <h3 className="text-lg font-semibold truncate">
                {equipment.name}
              </h3>
              <p>
                Available: <span className="font-bold">{equipment.quantity}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* Load More Button */}
    {currentPage < totalPages && (
      <div className="flex justify-center mt-8">
        <Button
          onClick={handlePageChange}
          className="bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-900"
        >
          Load More
          <IoIosArrowDropdownCircle size={20} />
        </Button>
      </div>
    )}
  </div>
  )
}

export default Equipmentsuser
