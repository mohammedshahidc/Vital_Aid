"use client";
import React, { useEffect } from "react";
import { FaUserMd, FaBed, FaCalendarAlt, FaStethoscope, FaLaptopMedical, FaTint, FaHandHoldingHeart, FaDonate } from "react-icons/fa";
import { useAppSelector,useAppDispatch } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import { fetchDonors } from "@/lib/store/features/donorsSlice";
import { fetchEvents } from "@/lib/store/features/eventSlice";
import { getallEquipment } from "@/lib/store/features/EquipmentSlice";
import Equipments from "../Forms/equipments";

function Dashboard() {
  const dispatch=useAppDispatch()
  useEffect(()=>{
     dispatch(fetchUsers());
     dispatch(fetchDonors());
     dispatch(fetchEvents());
     dispatch(getallEquipment())


  },[dispatch])
  const {users}=useAppSelector((state)=>state.users)
    const {donors}=useAppSelector((state)=>state.donors)
    const {events}=useAppSelector((state)=>state.events)
    const {allEquipment}=useAppSelector((state)=>state.equipments)

  console.log(users,'who');
  
  return (
    <div className="flex w-full flex-row p-8 dark:bg-gray-800 overflow-auto">
      <main className="mt-6 w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          <div className="bg-green-100 dark:bg-green-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaUserMd className="absolute top-2 right-2 text-4xl text-green-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Doctors</h2>
            <p className="text-2xl font-bold text-green-600">120</p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaBed className="absolute top-2 right-2 text-4xl text-yellow-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Patients</h2>
            <p className="text-2xl font-bold text-yellow-600">{users.length}</p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaCalendarAlt className="absolute top-2 right-2 text-4xl text-blue-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Medical Events</h2>
            <p className="text-2xl font-bold text-blue-600">{events.length}</p>
          </div>

          <div className="bg-purple-100 dark:bg-purple-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaStethoscope className="absolute top-2 right-2 text-4xl text-purple-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Appointments</h2>
            <p className="text-2xl font-bold text-purple-600">350</p>
          </div>

          {/* Available Equipment */}
          <div className="bg-indigo-100 dark:bg-indigo-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaLaptopMedical className="absolute top-2 right-2 text-4xl text-indigo-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Available Equipment</h2>
            <p className="text-2xl font-bold text-indigo-600">{allEquipment?.length}</p>
          </div>

          {/* Active Blood Donors */}
          <div className="bg-red-100 dark:bg-red-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaTint className="absolute top-2 right-2 text-4xl text-red-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Blood Donors</h2>
            <p className="text-2xl font-bold text-red-600">{donors.length}</p>
          </div>

          {/* Active Donors */}
          <div className="bg-teal-100 dark:bg-teal-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaHandHoldingHeart className="absolute top-2 right-2 text-4xl text-teal-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Volentiearce</h2>
            <p className="text-2xl font-bold text-teal-600">80</p>
          </div>

          {/* Donations */}
          <div className="bg-pink-100 dark:bg-pink-800 shadow-lg rounded-lg p-6 flex flex-col items-center relative">
            <FaDonate className="absolute top-2 right-2 text-4xl text-pink-600 opacity-30" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Donations</h2>
            <p className="text-2xl font-bold text-pink-600">$50,000</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
