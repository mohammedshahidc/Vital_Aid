"use client"

import React, { useEffect, useState } from 'react';
import { useParams,useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import axiosErrorManager from '@/utils/axiosErrormanager';
import { Button } from '@mui/material';
import { MdClose } from "react-icons/md";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import Image from 'next/image';

type Doctor = {
    _id: string;
    doctor: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    qualification: string[];
    specialization: string[];
    availablity: string;
    profileImage: string;
    description: string;
    address: string;
    certificates: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

function Editdr() {
    const { drid } = useParams();
    const [dr, setDr] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [qualifications, setQualifications] = useState<string[]>([]);
    const [availablity, setAvailability] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
    const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);
    const [spcInput, setSpcInput] = useState<string>("");
    const [qualInput, setQualInput] = useState<string>("");

    const Router= useRouter()

    useEffect(() => {
        const fetchDr = async () => {
            try {
                const response = await axiosInstance.get(`/doctors/getDetailsof/${drid}`);
                const data = response.data.data[0];

                setDr(data);
                setSpecializations(data.specialization);
                setQualifications(data.qualification);
                setAvailability(data.availablity);
                setAddress(data.address);
                setDescription(data.description);
                setCertificateFiles(data.certificates);
                setProfilePreview(data.profileImage);
                setCertificatePreviews(data.certificates);
            } catch (error) {
                axiosErrorManager(error);
            } finally {
                setLoading(false);
            }
        };

        if (drid) fetchDr();
    }, [drid]);

   
    const handleAddSpecialization = () => {
        if (spcInput.trim()) {
            setSpecializations((prev) => [...prev, spcInput.trim()]);
            setSpcInput("");
        }
    };

    const handleAddQualification = () => {
        if (qualInput.trim()) {
            setQualifications((prev) => [...prev, qualInput.trim()]);
            setQualInput(""); 
        }
    };

    const handleDeleteSpecialization = (index: number) => {
        setSpecializations((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteQualification = (index: number) => {
        setQualifications((prev) => prev.filter((_, i) => i !== index));
    };

    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    const handleCertificateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setCertificateFiles((prev) => [...prev, ...newFiles]);
            setCertificatePreviews((prev) => [
                ...prev,
                ...newFiles.map((file) => URL.createObjectURL(file)),
            ]);
        }
    };

    const removeCertificate = (index: number) => {
        setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
        setCertificatePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("qualification", JSON.stringify(qualifications));
        formData.append("specialization", JSON.stringify(specializations));
        formData.append("availablity", availablity);
        formData.append("address", address);
        formData.append("description", description);

        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        certificateFiles.forEach((file) => {
            formData.append("certificates", file);
        });

        try {
            const response = await axiosInstance.put(`/doctors/editdetailsof/${drid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Doctor details updated successfully!");
            }
            Router.push(`/admin/doctors/${drid}`)
        } catch (error) {
            axiosErrorManager(error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full p-4 pl-2 md:pl-12 bg-white mx-auto">
            <form className="mt-9" onSubmit={handleSubmitDetails}>
                <h1 className="mb-3 font-bold text-green-400">Edit Details of {dr?.doctor?.name}</h1>

                <div className="flex gap-4">
              
                    <div className="flex flex-col gap-2 w-full">
                        <label>Specializations</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={spcInput}
                                onChange={(e) => setSpcInput(e.target.value)}
                                placeholder="Enter the specialization"
                                className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                            />
                            <Button onClick={handleAddSpecialization} variant="contained">
                                Add
                            </Button>
                        </div>
                        <div className="mt-3">
                            {specializations.map((spl, index) => (
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
                            {qualifications.map((qual, index) => (
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
                        <label>Availability</label>
                        <input 
                            type="text" 
                            value={availablity} 
                            onChange={(e) => setAvailability(e.target.value)} 
                            className="w-full h-14 p-2 border border-gray-300 rounded-lg" 
                        />

                        <label>Address</label>
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="w-full h-14 p-2 border border-gray-300 rounded-lg" 
                        />
                    </div>

                    
                    <div className="flex flex-col items-center w-1/2">
                        <label className="mb-2">Profile Image</label>
                        <label className="w-full p-6 border-2 rounded-md shadow-lg flex flex-col items-center justify-center cursor-pointer">
                            {profilePreview && <Image src={profilePreview} alt="Profile" width={100} height={100} />}
                            {!profilePreview?(<FaFileUpload className="text-4xl text-gray-600 mb-2" />):null}
                            <input type="file" className="hidden" onChange={handleProfileImageChange} />
                        </label>
                    </div>
                </div>
                <div className="pt-5">
                    <label>About Doctor</label>
                    <textarea 
                        className="w-full rounded-lg border-2 h-28" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <label className="flex items-center space-x-3 cursor-pointer p-2 bg-slate-50 border-2 w-full md:max-w-fit mt-4 rounded-lg">
                        <FaPlus className="text-black" size={16} />
                        <span className="text-black font-medium">Add Certificates</span>
                        <input type="file" multiple className="hidden" onChange={handleCertificateChange} />
                    </label>
                </div>

                <div className="flex gap-4 mt-3">
                    {certificatePreviews.map((src, index) => (
                        <div key={index} className="relative">
                            <Image src={src} alt={`Certificate ${index}`} width={50} height={50} className="border" />
                            <MdClose className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => removeCertificate(index)} />
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <Button type="submit" variant="contained">Submit Details</Button>
                </div>
            </form>
        </div>
    );
}

export default Editdr;
