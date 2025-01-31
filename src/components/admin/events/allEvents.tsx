"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchEvents } from "@/lib/store/features/eventSlice";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

function AllEvents() {
  const { events, loading, error } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (id: string) => {
    router.push(`/admin/editEvents/${id}`); 
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        All Events
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-gray-700 dark:text-white">Image</th>
              <th className="border p-3 text-gray-700 dark:text-white">Title</th>
              <th className="border p-3 text-gray-700 dark:text-white">Date</th>
              <th className="border p-3 text-gray-700 dark:text-white">Location</th>
              <th className="border p-3 text-gray-700 dark:text-white">Organization</th>
              <th className="border p-3 text-gray-700 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-3">
                  {event.image ? (
                   <Image
                   src={Array.isArray(event.image) ? event.image[0] : event.image}
                   alt={event.title}
                   width={64}  
                   height={64}
                   className="object-cover rounded-lg"
                 />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{event.title}</td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{event.date}</td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{event.location}</td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{event.organization}</td>
                <td className="border p-3">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
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

export default AllEvents;
