

"use client";
import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import { equipmentSchema } from "@/schema/eqiupmentSchema";
import { useFormik } from "formik";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addnewEquipment } from "@/lib/store/features/EquipmentSlice";
import { useParams } from "next/navigation";
import { Equipment } from "@/lib/store/features/EquipmentSlice";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { useRouter } from "next/navigation";

interface FormValue {
    name: string;
    quantity: number | string;
    image: string| null;
    description: string;
}

const initialValues: FormValue = {
    name: '',
    quantity: '',
    image: null,
    description: ''
};

const Equipments = () => {

    const { isLoading, allEquipment } = useAppSelector((state) => state.equipments);
    const [item, setItem] = useState<Equipment | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const router = useRouter()
    const { equipmentid } = useParams();
    const dispatch = useAppDispatch();
    



    
    const { errors, touched, handleBlur, handleChange, handleSubmit, handleReset, values, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: equipmentSchema,
        onSubmit: async (e) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('quantity', values.quantity.toString());
                formData.append('description', values.description);

                if (values.image) {
                    formData.append('image', values.image);
                }
               const formvalue:formvalue = {
                    ...values, imageUrl
                }

                setImagePreview(null);

                if (!equipmentid) {
                    await dispatch(addnewEquipment(formvalue));
                    router.push('/admin/equipments/list')
                    await handleReset(e);
                } else {
                    try {
                        await axiosInstance.put(`/equipment/editEquipment/${equipmentid}`, formData);
                        router.push('/admin/equipments/list')
                    } catch (error) {
                        axiosErrorManager(error);
                    }
                }
            } catch (error) {
                console.log('Form error:', error);
                axiosErrorManager(error);
            }
        }
    });

    
    useEffect(() => {
        if (equipmentid) {
            const foundItem = allEquipment?.find((eq) => eq._id === equipmentid) ?? null;
            setItem(foundItem);
            if (foundItem?.image) {

                setImagePreview(foundItem.image);
                setFieldValue("image", foundItem.image);
            }
        }
    }, [equipmentid, allEquipment,setFieldValue]);
   
    

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));

            try {
                const response = await axiosInstance.get(`/auth/generate-signed-url`, {
                    params: { fileType: file.type },
                });

                const { signedUrl, fileName } = response.data;
                console.log("dddd",signedUrl);
                

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
    
    type formvalue={
        imageUrl: string | null;
        name: string;
        quantity: number | string;
        image: string| null;
        description: string;
    } 

    useEffect(() => {
        if (item) {
            setFieldValue("name", item.name);
            setFieldValue("quantity", item.quantity);
            setFieldValue("description", item.description);
        }
    }, [item, setFieldValue]);


    return (
        <div className="w-screen h-fit fixed flex justify-center items-center p-6 sm:w-fit">
            <div className="mx-5 w-full h-4/6 sm:w-11/12 md:w-[1000px] lg:w- bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
                    Add Equipment
                </h2>

                <form className="space-y-2 " onSubmit={handleSubmit}>

                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter the title"
                            className={`w-full p-3 border rounded-md ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium text-gray-700">Quantity</label>
                            <input
                                id="quantity"
                                value={values.quantity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="number"
                                placeholder="Enter quantity"
                                className={`w-full p-3 border rounded-md ${errors.quantity && touched.quantity ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                            />
                            {errors.quantity && touched.quantity && (
                                <div className="text-red-500 text-sm">{errors.quantity}</div>
                            )}
                        </div>


                        <div>
                            <label className="block font-medium text-gray-700">Equipment Image</label>
                            <label className="w-full h-32 p-6 border-2 border-dashed rounded-md bg-green-100 flex flex-col items-center justify-center cursor-pointer">
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
                                    <span className="text-gray-600">{"Upload image"}</span>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
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


                    <div>
                        <label className="block font-medium text-gray-700">About the Equipment</label>
                        <textarea
                            rows={4}
                            className={`w-full p-3 border rounded-md ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                            id="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                        ></textarea>
                        {errors.description && touched.description && (
                            <div className="text-red-500 text-sm">{errors.description}</div>
                        )}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white"
                        >
                            {isLoading ? 'Loading...' : (!item ? 'Add' : 'Edit')}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                            }}
                            className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Equipments;

