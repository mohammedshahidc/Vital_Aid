"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiFolder } from "react-icons/fi";
import axiosInstance from "@/utils/axios";
import Image from "next/image";

interface DonorFormData {
  name: string;
  BloodGroup: string;
  Phone: string;
  Gender: string;
  Age: string;
  Address: string;
  image: FileList | null;
}

const AddDonor = () => {
  const { register, handleSubmit, reset } = useForm<DonorFormData>();
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

        await setImageUrl(`https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`);

      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };


  const onSubmit: SubmitHandler<DonorFormData> = async (data) => {
    if (!imageUrl) {
      alert("Please select an image");
      return;
    }

    try {
      const donorData = {
        ...data,
        imageUrl,
      };

      await axiosInstance.post("/donors/addDoners", donorData);

      alert("Donor added successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert("Error adding donor");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add New Donor
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-sky-50"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            {...register("BloodGroup", { required: true })}
            defaultValue=""
            className="w-full p-3 border rounded-lg focus:ring bg-sky-50"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("Phone", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring bg-sky-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            {...register("Gender", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring bg-sky-50"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Age"
            {...register("Age", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300 bg-sky-50"
          />
        </div>

        <input
          type="text"
          placeholder="Address"
          {...register("Address", { required: true })}
          className="w-full p-3 border rounded-lg focus:ring bg-sky-50"
        />

        <label className="w-full flex items-center justify-center p-3 sm:p-4 sm:text-lg border rounded-lg cursor-pointer hover:opacity-80 transition focus:ring-green-300  bg-sky-50 min-h-[50px] sm:min-h-[60px]">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <FiFolder className="mr-2 text-xl sm:text-2xl" />
          <span className="text-sm sm:text-base">Choose an Image</span>
        </label>

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

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              reset();
              setImagePreview(null);
            }}
            className="px-4 py-2 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2  bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Add Donor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonor;
