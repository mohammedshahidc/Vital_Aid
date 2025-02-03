"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteDonor, fetchDonors } from "@/lib/store/features/donorsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllDonors() {
  const { donors, loading, error } = useAppSelector((state) => state.donors);
  console.log(donors, "donors");

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (id: string) => {
    router.push(`/admin/editDonors/${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      await dispatch(deleteDonor(id));
      dispatch(fetchDonors());
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        All Donors
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-gray-700 dark:text-white">
                Image
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">Name</th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Blood Group
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Phone
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Gender
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">Age</th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Address
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr
                key={donor._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border p-3">
                  {donor.image && donor.image.length > 0 ? (
                    <Image
                      src={donor.image[0]}
                      alt={donor.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.name}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.BloodGroup}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Phone}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Gender}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Age}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Address}
                </td>
                <td className=" p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(donor._id)}
                    className="p-2 mt-4 text-blue-800 rounded-md transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="p-2 mt-4 text-red-700 rounded-md transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonors;
