"use client";
import React from "react";
import useEvents from "@/lib/Query/hooks/useEvents";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string[];
  location: string;
  organization: string;
};

const Events: React.FC = () => {
  const { events, isLoading, error } = useEvents();

  if (isLoading)
    return <Spinner/>

  if (error || events?.error === "true")
    return <p className="text-center text-red-500">Error loading events!</p>;

  const eventList: Event[] = Array.isArray(events?.events) ? events.events : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = eventList.filter(event => new Date(event.date) >= today);
  const expiredEvents = eventList.filter(event => new Date(event.date) < today);

  upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  expiredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

  const sortedEvents = [...upcomingEvents, ...expiredEvents];

  return (
    <div className="max-w-6xl mx-auto p-5 h-full min-h-screen">
      <h1 className="text-3xl font-semibold text-center  text-red-950 mb-6">
        Upcoming  Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event: Event) => {
            const eventDate = new Date(event.date);
            const isExpired = eventDate < today;

            return (
              <div
                key={event._id}
                className={`bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
                  isExpired ? "opacity-50 grayscale" : ""
                }`}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={event.image[0]}
                    alt={event.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <p className="text-gray-500 text-sm">
                    {eventDate.toDateString()}
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    {event.description.slice(0, 100)}...
                  </p>
                  {isExpired ? (
                    <span className="block text-red-500 font-bold mt-3">
                      Event Ended
                    </span>
                  ) : (
                    <a
                      href={`/user/events/${event._id}`}
                      className="text-blue-600 font-bold mt-3 inline-block"
                    >
                      Read More →
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
