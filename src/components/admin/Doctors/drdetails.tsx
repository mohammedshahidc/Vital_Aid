"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import Image from "next/image";
import Link from "next/link";

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

function Drdetails() {
    const params = useParams();
    const drid = params?.drid as string;
    const [dr, setDr] = useState<Doctor | null>(null);
    console.log(dr);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDr = async () => {
            try {
                const response = await axiosInstance.get(`/doctors/getDetailsof/${drid}`);
                setDr(response.data.data[0]);
            } catch (error) {
                axiosErrorManager(error);
            } finally {
                setLoading(false);
            }
        };

        if (drid) fetchDr();
    }, [drid]);

    const deletedr = async () => {
        try {
            const res = await axiosInstance.put(`/doctors/deletedr/${drid}`);
            console.log(res);
            router.push("/admin/doctors");
        } catch (error) {
            axiosErrorManager(error);
        }
    };

    if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
    if (!dr) return <p className="text-center text-lg text-red-500">Doctor details not found.</p>;

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-lg max-w-full mx-5 bg-white">
            <div className="flex justify-center md:w-72 md:h-auto">
                <Image
                    src={dr?.profileImage}
                    alt={"dr profile"}
                    width={160}
                    height={160}
                    className="w-72 h-72 object-cover rounded-lg"
                />
            </div>

            <div className="flex-1">
                <div className="bg-gray-50 p-2 rounded-lg">
                    <h2 className="text-xl font-bold text-green-600">{dr?.doctor?.name}</h2>
                    <p className="text-gray-700">Email: {dr?.doctor?.email}</p>
                    <p className="text-gray-700">Ph: {dr?.doctor?.phone}</p>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg mt-3">
                    <p className="font-semibold mt-2">Qualification:</p>
                    <ul className="list-disc list-inside text-gray-700">
                        {dr?.qualification?.map((qual, index) => (
                            <li key={index} className="list-none ">{qual}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg mt-3">
                    <p className="font-semibold mt-2">Specialization:</p>
                    <ul className="list-disc list-inside text-gray-700">
                        {dr?.specialization?.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg mt-3">
                    <p className="font-semibold mt-2">Availability: {dr?.availablity}</p>
                    <p className="mt-2 text-gray-600">{dr?.description}</p>
                </div>

                <div className="mt-4">
                    <p className="font-semibold">Certificates:</p>
                    <div className="flex gap-2">
                        {dr?.certificates?.map((cert, index) => (
                            <Image
                                key={index}
                                src={cert}
                                alt={`Certificate ${index + 1}`}
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover border rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <Link href={`/admin/doctors/edit/${drid}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Edit</Link>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => { deletedr() }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Drdetails;
