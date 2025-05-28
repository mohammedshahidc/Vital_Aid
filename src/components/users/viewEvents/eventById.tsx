"use client";
import React from "react";
import { useParams } from "next/navigation";
import useEventById from "@/lib/Query/hooks/useEventsById";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import Spinner from "@/components/ui/spinner";


const EventById: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const { data: event, isLoading, error } = useEventById(id);


  if (isLoading)
    return <Spinner/>
  if (error)
    return <p className="text-center text-red-500">Error fetching event!</p>;
  if (!event || event.isDeleted)
    return <p className="text-center text-gray-500">Event not found</p>;

  return (
    <div className="max-w-5xl h-screen mx-auto p-8 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative w-full h-80">
          <Image
            src={event?.event?.image[0] || "/default-image.jpg"} 
            alt={event.event?.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-medium  text-red-950">{event.event?.title}</h1>

          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <span>{new Date(event?.event?.date).toDateString()}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span>{event?.event?.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaBuilding className="text-green-500 mr-2" />
            <span>{event?.event?.organization}</span>
          </div>

          <p className="text-gray-700 leading-6">{event?.event?.description}</p>

         
        </div>
      </div>
    </div>
  );
};

export default EventById;
