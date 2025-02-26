'use client'
import React, { useEffect, useState } from 'react'
import { volunteerSchema } from '@/schema/volunteersSchema'
import { useFormik } from 'formik'
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Volunteer, addVolunteer } from '@/lib/store/features/volunteers';
import { useParams } from 'next/navigation';

import axiosInstance from '@/utils/axios';
import axiosErrorManager from '@/utils/axiosErrormanager';
import { useRouter } from 'next/navigation';


interface formValue {
    name: string,
    phone: number | string,
    gender: 'male' | 'female' | null,
    image: File | null
}

const initialState: formValue = {
    name: '',
    phone: '',
    gender: null,
    image: null
}

type formvalue={
    imageUrl: string | null;
    name: string;
    phone: number | string;
    gender: "male" | "female" | null;
    image: File | null;
} 


const Vlounteers = () => {
    const route = useRouter()
    const dispatch = useAppDispatch()
    const { volunteerid } = useParams()
    const { allVolunteers } = useAppSelector((state) => state.volunteers)
    const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);


    const { values, errors, handleChange, handleBlur, handleSubmit, touched, setFieldValue } = useFormik({

        initialValues: initialState,
        validationSchema: volunteerSchema,
        onSubmit: async () => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('phone', values.phone.toString());
                formData.append('gender', values.gender || "");
                if (values.image) {
                    formData.append('image', values.image);
                }
                setImagePreview(null);


                const formvalue:formvalue = {
                    ...values, imageUrl
                }


                if (!volunteerid) {
                    const response = await dispatch(addVolunteer(formvalue))
                    if (response.meta.requestStatus == 'fulfilled') {
                        route.push('/admin/volunteers/list')
                    }
                    console.log('resp', response.meta.requestStatus);
                } else {
                    try {
                        const response = await axiosInstance.put(`/volunteers/edit/${volunteerid}`, formData)
                        if (response.status === 200) {
                            route.push('/admin/volunteers/list');
                        }

                    } catch (error) {
                        axiosErrorManager(error)
                    }
                }

            } catch (error) {
                console.log("error:", error);
            }
        }
    });

    useEffect(() => {
        if (volunteerid) {
            const selectvolunteer = allVolunteers?.find((vol) => vol._id === volunteerid) ?? null;
            setVolunteer(selectvolunteer)
            if (selectvolunteer) {
                setImagePreview(selectvolunteer.image)
                setFieldValue("image", selectvolunteer.image)


            }

        }
    }, [allVolunteers, volunteerid, setFieldValue])


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));

            try {
                const response = await axiosInstance.get(`/auth/generate-signed-url`, {
                    params: { fileType: file.type },
                });

                const { signedUrl, fileName } = response.data;
                console.log("dddd", signedUrl);


                await fetch(signedUrl, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": file.type },
                });

                const uploadedUrl = `https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
                setImageUrl(uploadedUrl);
                setFieldValue("image", uploadedUrl);

                console.log("Uploaded Image URL:", uploadedUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    useEffect(() => {
        if (volunteer) {
            setFieldValue("name", volunteer.name)
            setFieldValue("phone", volunteer.phone)
            setFieldValue("gender", volunteer.gender)
        }

    }, [volunteer, setFieldValue])

    return (
        <div className="w-screen h-fit fixed flex justify-center items-center p-6 sm:w-fit">
            <div className="mx-5 w-full h-4/6 my-11 sm:w-11/12 md:w-[1000px] lg:w- bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
                    Add Volunteers
                </h2>

                <form className="space-y-2" onSubmit={handleSubmit}>

                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Enter the title"
                            className={`w-full p-3 border rounded-md border-gray-500 bg-green-200`}
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>

                    {/* Gender Field */}
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={values.gender === "male"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={values.gender === "female"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                    {touched.gender && errors.gender && (
                        <div className="text-red-500 text-sm">{errors.gender}</div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium text-gray-700">Phone</label>
                            <input
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                placeholder="Enter quantity"
                                className={`w-full p-3 border rounded-md border-gray-500 bg-green-200`}
                            />
                            {errors.phone && touched.phone && (
                                <div className="text-red-500 text-sm">{errors.phone}</div>
                            )}
                            {/* Buttons */}
                            <div className="hidden flex-col sm:flex-row space-x-4 mx-32 justify-center mt-8 sm:block md:block ">
                                <button
                                    type="submit"
                                    className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white w-full sm:w-auto"
                                >
                                    Add
                                </button>
                                <button
                                    className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="block font-medium text-gray-700">Profile Image</label>
                            <label className="w-full h-32 p-6 border-2 border-dashed rounded-md bg-green-200 border-gray-500 flex flex-col items-center justify-center cursor-pointer">
                                <FaFileUpload className="text-4xl text-gray-600 mb-2" />
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        width={100}
                                        height={100}
                                        alt="Preview"
                                        className="rounded-md object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-600">{values.image?.name || "Upload image"}</span>
                                )}
                                <input
                                    type="file"
                                    className="hidden bg-green-200"
                                    id="image"
                                    onBlur={handleBlur}
                                    onChange={handleImageChange}
                                />
                            </label>
                            {errors.image && touched.image && (
                                <div className="text-red-500 text-sm">{errors.image}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:hidden md:hidden">
                        <button
                            type="submit"
                            className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white w-full sm:w-auto"
                        >
                            Add
                        </button>
                        <button
                            className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white w-full sm:w-auto"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Vlounteers
