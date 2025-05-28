"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiFolder } from "react-icons/fi";
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

const AddEvents = () => {
  const { register, handleSubmit, reset } = useForm<EventFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));

      try {
        const response = await axiosInstance.get(`/auth/generate-signed-url`, {
          params: { fileType: file.type },
        });

        const { signedUrl, fileName } = response.data;

        await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        const uploadedUrl = `https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
        setImageUrl(uploadedUrl);

        console.log("Uploaded Image URL:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    if (!imageUrl) {
      alert("Please select an image");
      return;
    }
    try {
      const eventData = {
        ...data,
        imageUrl,
      };

      await axiosInstance.post("/events/addevents", eventData);

      alert("Event added successfully!");
      reset();
      setImagePreview(null);
      setImageUrl(null);
    } catch (error) {
      console.error(error);
      alert("Error adding event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add New Event
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
            <span className="text-sm sm:text-base">Choose an Image</span>
          </label>
        </div>

        {imagePreview && (
          <div className="relative mt-2">
            <Image
              src={imagePreview}
              width={200}
              height={200}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
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
            onClick={() => {
              reset();
              setImagePreview(null);
              setImageUrl(null);
            }}
            className="px-4 py-2 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
