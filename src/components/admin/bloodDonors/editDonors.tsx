"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { FiFolder } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const EditDonor = () => {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<DonorFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/donors/getDonorsById/${id}`);
        const donorData = response.data.donors;

        setValue("name", donorData.name);
        setValue("BloodGroup", donorData.BloodGroup);
        setValue("Phone", donorData.Phone);
        setValue("Gender", donorData.Gender);
        setValue("Age", donorData.Age);
        setValue("Address", donorData.Address);
        setImagePreview(donorData.image);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonorDetails();
  }, [id, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", e.target.files);
    }
  };

  const onSubmit: SubmitHandler<DonorFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("BloodGroup", data.BloodGroup);
      formData.append("Phone", data.Phone);
      formData.append("Gender", data.Gender);
      formData.append("Age", data.Age);
      formData.append("Address", data.Address);
      if (data.image) {
        formData.append("image", data.image[0]);
      }

      await axiosInstance.put(`/donors/editDonors/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Donor updated successfully!", { autoClose: 1500 });
      setTimeout(() => {
        router.push("/admin/donorsTabile");
      }, 1500);
    } catch (error) {
      console.error("Error updating donor:", error);
      toast.error("Failed to update donor.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Edit Donor
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300 bg-sky-50"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Blood Group"
            {...register("BloodGroup", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring bg-sky-50"
          />
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
        <label className="w-full flex items-center justify-center p-3 border rounded-lg cursor-pointer hover:opacity-80 transition focus:ring-green-300 bg-gradient-to-r from-green-100 to-green-200 min-h-[50px]">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <FiFolder className="mr-2 text-xl" />
          <span className="text-sm">Choose an Image</span>
        </label>
        {imagePreview && (
          <div className="relative w-full h-40 rounded-lg">
            <Image
              src={imagePreview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/allDonors")}
            className="px-4 py-2 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Update Donor
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonor;
