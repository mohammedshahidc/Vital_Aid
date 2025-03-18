"use client";
import { useFetchDetails } from "@/lib/Query/hooks/useReport";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaMapPin, FaRegAddressCard } from "react-icons/fa";
import { FiEdit, FiMail } from "react-icons/fi";
import { IoCallOutline, IoTimeOutline } from "react-icons/io5";
import { TbPhotoEdit } from "react-icons/tb";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Image from "next/image";
import { SelectChangeEvent } from "@mui/material";
import { GrUserWorker } from "react-icons/gr"
import {
  Button,
  Card,
  Chip,
  Input,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

type UserDetails = {
  age: string;
  gender: string;
  bloodgroup: string;
  occupation: string;
  address: string;
  profileImage: string;
};

function Profilesection() {
  const { user } = useAppSelector((state) => state.auth);
  const { details ,refetch} = useFetchDetails(user?.id ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [formData, setFormData] = useState<UserDetails & { id?: string }>({
    age: "",
    gender: "",
    bloodgroup: "",
    occupation: "",
    address: "",
    profileImage: "",
  });

  const hasExistingDetails = details && details.length > 0;
  const [showFullAddress, setShowFullAddress] = useState(false);

 
  const address = hasExistingDetails ? details[0]?.address || "Not set" : "Not set";


  const truncateText = (text:string, length:number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };


  useEffect(() => {
    if (hasExistingDetails) {
      setFormData({
        id: details[0]?._id,
        age: details[0]?.age ?? "",
        gender: details[0]?.gender ?? "",
        bloodgroup: details[0]?.bloodgroup ?? "",
        occupation: details[0]?.occupation ?? "",
        address: details[0]?.address ?? "",
        profileImage: details[0]?.profileImage?.originalProfile ?? "",
      });
    }
  }, [details, hasExistingDetails]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
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
        const newImageUrl = `https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
        setFormData((prev) => ({
          ...prev,
          profileImage: newImageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      if (hasExistingDetails) {
        await axiosInstance.put(`/users/editdetailsofthe`, formData);
        toast.success("Profile updated successfully");
      } else {
        await axiosInstance.post(`/users/addDetails/${user?.id}`, formData);
        toast.success("Profile details added successfully");
      }
      refetch()
      setIsEditing(false);
    } catch (error) {
      axiosErrorManager(error);
      toast.error("Failed to save profile details");
    }
  };

  return (
    <>
      <Card className="shadow-xl rounded-xl overflow-hidden border-t-4 border-teal-400">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <div className="flex justify-center md:justify-start mb-6 md:mb-0">
              <div
                className="relative h-32 w-32 md:h-40 md:w-40"
                onMouseEnter={() => !isEditing && setShowProfileTooltip(true)}
                onMouseLeave={() => setShowProfileTooltip(false)}
              >
                <div
                  className={`rounded-full overflow-hidden shadow-xl transition-transform duration-300 ${
                    !isEditing && "hover:scale-105"
                  }`}
                >
                  <Image
                    src={
                      hasExistingDetails &&
                      details[0]?.profileImage?.originalProfile?.trim()
                        ? details[0]?.profileImage.originalProfile
                        : "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                    }
                    width={200}
                    height={200}
                    alt="Profile Image"
                    className={`object-cover h-full w-full ${
                      isEditing ? "blur-sm opacity-50" : ""
                    }`}
                  />
                </div>

                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                    />
                    <div className="bg-white/70 rounded-full p-3 shadow-lg">
                      <TbPhotoEdit size={28} className="text-green-600 z-10" />
                    </div>
                  </div>
                )}

                {showProfileTooltip && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-black/60 text-white text-xs rounded px-2 py-1">
                      Click edit to change photo
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex  sm:flex-row items-center sm:items-start gap-2 justify-center md:justify-start">
                <h2 className="text-2xl font-semibold text-green-600 text-center md:text-left">
                  {user?.name}
                </h2>
                {hasExistingDetails && details[0]?.bloodgroup && (
                  <Chip
                    label={details[0]?.bloodgroup}
                    size="small"
                    color="error"
                    icon={<BloodtypeIcon fontSize="small" />}
                  />
                )}
              </div>

              <div className="space-y-2 text-gray-600">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mx-auto md:mx-0">
                    <Input
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={
                        <FaClock className="mr-2 text-gray-400" />
                      }
                    />

                    <FormControl
                      variant="outlined"
                      className="bg-gray-50 rounded"
                    >
                      <InputLabel id="gender-select-label">Gender</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleSelectChange}
                        label="Gender"
                        sx={{ minWidth: "100%" }}
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="others">Other</MenuItem>
                      </Select>
                    </FormControl>

                    <Input
                      name="bloodgroup"
                      value={formData.bloodgroup}
                      onChange={handleInputChange}
                      placeholder="Blood Group"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={
                        <BloodtypeIcon
                          className="mr-2 text-gray-400"
                          fontSize="small"
                        />
                      }
                    />
                    <Input
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Occupation"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={<FiEdit className="mr-2 text-gray-400" />}
                    />
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="bg-gray-50 px-3 py-2 rounded col-span-1 sm:col-span-2"
                      startAdornment={
                        <FaMapPin className="mr-2 text-gray-400" />
                      }
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="md:hidden space-y-2">
                      <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex items-center gap-2">
                          <IoTimeOutline
                            size={20}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <span className="font-medium">Age:</span>
                          {hasExistingDetails
                            ? details[0]?.age || "Not set"
                            : "Not set"}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMail
                            size={20}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <span className="truncate">{user?.email}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex items-center gap-2">
                          <IoCallOutline
                            size={20}
                            className="text-gray-500 flex-shrink-0"
                          />
                          {user?.phone || "Not set"}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiEdit
                            size={20}
                            className="text-gray-500 flex-shrink-0"
                          />
                          <span className="font-medium">Gender:</span>
                          {hasExistingDetails
                            ? details[0]?.gender || "Not set"
                            : "Not set"}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-2 gap-y-2">
                      <div className="flex items-center gap-2">
                        <IoTimeOutline size={20} className="text-gray-500" />
                        <span className="font-medium">Age:</span>
                        {hasExistingDetails
                          ? details[0]?.age || "Not set"
                          : "Not set"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMail size={20} className="text-gray-500" />
                        {user?.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <IoCallOutline size={20} className="text-gray-500" />
                        {user?.phone || "Not set"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiEdit size={20} className="text-gray-500" />
                        <span className="font-medium">Gender:</span>
                        {hasExistingDetails
                          ? details[0]?.gender || "Not set"
                          : "Not set"}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-2">
                      <p className="flex items-center gap-2">
                        <GrUserWorker size={20} className="text-gray-500" />
                        <span className="font-medium">job:</span>
                        {hasExistingDetails
                          ? details[0]?.occupation || "Not set"
                          : "Not set"}
                      </p>
                      <p className=" hidden md:flex  gap-2">
                        <FaRegAddressCard size={20} className="text-gray-500" />
                        <span className="font-medium">Address:</span>
                        {showFullAddress ? (

                          <span>{address}</span>
                        ) : (
                          <span>
                            {truncateText(address, 20)}{" "}
                            {address.length > 20 && (
                              <button 
                                onClick={() => setShowFullAddress(true)}
                                className="text-blue-500 underline ml-1 text-xs"
                              >
                                Read more
                              </button>
                            )}
                          </span>
                        )}
                      </p>

                    
                    </div>
                  </div>
                )}

                <div className="flex justify-center md:justify-start gap-2 mt-4">
                  {isEditing ? (
                    <>
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                      >
                        {hasExistingDetails ? "Update" : "Add"}
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="text"
                      color="primary"
                      startIcon={<FiEdit />}
                      sx={{ textTransform: "none" }}
                    >
                      {hasExistingDetails
                        ? "Edit Profile"
                        : "Add Details"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Profilesection;
