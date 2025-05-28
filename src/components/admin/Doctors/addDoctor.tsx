"use client";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

const AddDoctor = () => {
  const [specilizations, setSplisation] = useState<string[]>([]);
  const [spclinpit, setInput] = useState("");
  const [regdrid, setRegdr] = useState("");
  const [regdr, setDR] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  console.log("pro", profileImage);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<string[]>([]);
  console.log("cert", certificates);

  const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);
  const [Qualification, setQualification] = useState<string[]>([]);
  const [qualInput, setQualInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const Router = useRouter();

  const handleproImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePreview(URL.createObjectURL(file));

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
        setProfileImage(uploadedUrl);
        console.log("Uploaded Image URL:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleCertificateChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newCertificates: string[] = [];

    try {
      for (const file of Array.from(files)) {
        newPreviews.push(URL.createObjectURL(file));
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
        newCertificates.push(uploadedUrl);
      }

      setCertificatePreviews((prev) => [...prev, ...newPreviews]);
      setCertificates((prev) => [...prev, ...newCertificates]);
    } catch (error) {
      console.error("Error uploading certificates:", error);
    }
  };

  const handleDeleteSpecialization = (index: number) => {
    setSplisation(specilizations.filter((_, i) => i !== index));
  };

  const handleDeleteQualification = (index: number) => {
    setQualification(Qualification.filter((_, i) => i !== index));
  };

  const handleRemoveCertificate = (index: number) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
    setCertificatePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handlesplication = () => {
    if (spclinpit.trim() !== "") {
      setSplisation((prev) => [...prev, spclinpit]);
      setInput("");
    }
  };

  const handleAddQualification = () => {
    if (qualInput.trim() !== "") {
      setQualification((prev) => [...prev, qualInput]);
      setQualInput("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/registerDocter",
        formData
      );
      setRegdr(response.data.data._id);
      setDR(response.data.data.name);
      setFormData({ name: "", email: "", phone: "", password: "" });
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  const [formDetails, setFormDetails] = useState({
    availability: "",
    description: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        doctor: regdrid,
        qualification: Qualification,
        specialization: specilizations,
        availability: formDetails.availability,
        description: formDetails.description,
        address: formDetails.address,
        profileImage: profileImage,
        certificates: certificates,
      };
      console.log("payy", payload);

      const response = await axiosInstance.post(
        "/doctors/postdetailsof",
        payload
      );
      console.log("Doctor details submitted:", response.data);
      setFormDetails({ availability: "", description: "", address: "" });
      setSplisation([]);
      setQualification([]);
      setProfileImage(null);
      setCertificates([]);
      setCertificatePreviews([]);

      alert("Details added successfully!");
      Router.push("/admin/doctors");
    } catch (error) {
      console.error("Error submitting doctor details:", error);
    }
  };

  return (
    <div>
      <div className="w-full p-4 pl-2 md:pl-12 bg-white mx-auto">
        {!regdr && (
          <form className="flex flex-col space-y-3" onSubmit={handlesubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Doctor's Name"
              className=" w-full md:w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
              required
            />
            <label>Email ID</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Doctor's Email"
              className="w-full md:w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Doctor's Phone number"
              className="w-full md:w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
              required
            />
            <label>Password</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter the password"
                className="w-60 h-14 p-2 border border-gray-300 rounded-lg"
                required
              />
              <Button type="submit" variant="contained">
                Register Doctor
              </Button>
            </div>
          </form>
        )}

        {regdr && (
          <form className="mt-9" onSubmit={handleSubmitDetails}>
            <h1 className="mb-3 font-bold text-green-400">
              Add Details of {regdr}
            </h1>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full ">
                <label>Specializations</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={spclinpit}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter the specialization"
                    className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                  />
                  <Button onClick={handlesplication} variant="contained">
                    Add
                  </Button>
                </div>
                <div className="mt-3">
                  {specilizations.map((spl, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-600">{spl}</span>
                      <MdClose
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDeleteSpecialization(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label>Qualifications</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={qualInput}
                    onChange={(e) => setQualInput(e.target.value)}
                    placeholder="Enter the qualification"
                    className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                  />
                  <Button onClick={handleAddQualification} variant="contained">
                    Add
                  </Button>
                </div>
                <div className="mt-3">
                  {Qualification.map((qual, index) => (
                    <div key={index} className="flex items-center gap-2 pb-3">
                      <span className="text-gray-600">{qual}</span>
                      <MdClose
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDeleteQualification(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-8">
              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-col gap-2">
                  <label>Availability</label>
                  <input
                    type="text"
                    name="availability"
                    onChange={handleInputChange}
                    placeholder="Doctor's Availability"
                    className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleInputChange}
                    placeholder="Doctor's Address"
                    className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-center w-1/2">
                <label className="mb-2">Profile Image</label>
                <label className="w-full md:w-[500px]  p-6 border-2 rounded-md shadow-lg flex flex-col items-center justify-center cursor-pointer">
                  <FaFileUpload className="text-4xl text-gray-600 mb-2" />
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleproImageChange}
                    className="hidden"
                  />
                  {profilePreview && (
                    <Image
                      src={profilePreview}
                      width={400}
                      height={400}
                      alt="Profile Preview"
                      className="w-32 h-32 mt-2 rounded-lg"
                    />
                  )}
                </label>
              </div>
            </div>
            <textarea
              className="w-full mt-5 rounded-lg border-2 h-28"
              name="description"
              value={formDetails.description}
              onChange={handleInputChange}
            ></textarea>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="flex items-center space-x-3 cursor-pointer p-2 bg-slate-50 border-2 w-full md:max-w-fit mt-4 rounded-lg mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                  <FaPlus className="text-black" size={16} />
                </div>
                <span className="text-black font-medium">Add Certificates</span>
                <input
                  type="file"
                  name="certificates"
                  multiple
                  onChange={handleCertificateChange}
                />
              </label>

              <div className="flex flex-col gap-4 mt-3 order-last md:order-none">
                {certificatePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Certificate ${index}`}
                      width={100}
                      height={100}
                      className="w-32 h-32 rounded-lg"
                    />
                    <MdClose
                      className="absolute top-1 right-1 cursor-pointer text-red-500"
                      onClick={() => handleRemoveCertificate(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Button type="submit" variant="contained">
                Submit Details
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddDoctor;
