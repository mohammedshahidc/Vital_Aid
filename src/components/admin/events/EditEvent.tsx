"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { FiFolder } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosInstance from "@/utils/axios";
import Image from "next/image";

interface EventFormData {
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  image: FileList | null;
}

const EditEvent = () => {
  const { id } = useParams();
  console.log("id", id);
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<EventFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/events/geteventbyid/${id}`);
        console.log(response, "response");

        const eventData = response.data.event;
        console.log(eventData, "response");

        setValue("title", eventData.title);
        setValue("organization", eventData.organization);
        setValue("location", eventData.location);
        setValue("date", eventData.date);
        setValue("description", eventData.description);
        setImagePreview(eventData.image);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventDetails();
  }, [id, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", e.target.files);
    }
  };

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("organization", data.organization);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("description", data.description);

      if (data.image) {
        formData.append("image", data.image[0]);
      }

      await axiosInstance.put(`/events/editevent/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event updated successfully!", { autoClose: 1500 });

      setTimeout(() => {
        router.push("/admin/allEvents");
      }, 1500);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Edit Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          {...register("title", { required: true })}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200"
          />
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Organization"
            {...register("organization", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200"
          />

          <label className="w-full flex items-center justify-center p-3 sm:p-4 sm:text-lg border rounded-lg cursor-pointer hover:opacity-80 transition focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200 min-h-[50px] sm:min-h-[60px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <FiFolder className="mr-2 text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base">Change Image</span>
          </label>
        </div>

        {imagePreview && (
          <div className="relative mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}

        <textarea
          placeholder="About the Event"
          {...register("description", { required: true })}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200"
        ></textarea>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/events")}
            className="px-4 py-2 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
