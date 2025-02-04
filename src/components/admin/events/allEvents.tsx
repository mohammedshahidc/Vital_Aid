"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchEvents, deleteEvent } from "@/lib/store/features/eventSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { Button } from "@mui/material";

function AllEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const { events, loading, error, totalPages } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchEvents(currentPage));
  }, [dispatch, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (id: string) => {
    router.push(`/admin/editEvents/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      await dispatch(deleteEvent(id));
      dispatch(fetchEvents(currentPage));
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        All Events
      </h2>
      <div className="flex justify-end items-end pr-1 pb-4">
        <Link href={"/admin/addEvents"}>
          <Button variant="outlined" color="primary">Create an event</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-gray-700 dark:text-white">
                Image
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Title
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">Date</th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Location
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Organization
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border p-3">
                  {event.image ? (
                    <Image
                      src={
                        Array.isArray(event.image)
                          ? event.image[0]
                          : event.image
                      }
                      alt={event.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {event.title}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {event.date}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {event.location}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {event.organization}
                </td>
                <td className=" p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="p-2 mt-5 text-blue-700  rounded-md transition shadow-md"
                  >
                    <MdEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="p-2 mt-5 text-red-800  rounded-md transition shadow-md"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
}

export default AllEvents;
