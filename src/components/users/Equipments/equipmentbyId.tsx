"use client"
import { getEquipmentById } from "@/lib/store/features/EquipmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EquipmentbyId = () => {
    const { equipment } = useAppSelector((state) => state.equipments)
    const dispatch = useAppDispatch()
    const[adress,setAdress]=useState<string>('')
    const { id } = useParams() 
    useEffect(() => {
        dispatch(getEquipmentById(id as string))
    }, [dispatch, id])

    const makeRequest=async()=>{
        
        try {
          await axiosInstance.post("/users/addrequest",{
                equipment:id,
                location:adress
            })
            toast.success('Equipment Requested+')
        } catch (error) {
            console.log("req error:",error);
            axiosErrorManager(error)
            
        }
        
    }

    return (
        <div className="flex w-full justify-center items-center sm:mt-7 mb-8 sm:mb-1">
            <div className="flex flex-col sm:flex-row justify-center items-center max-w-5xl bg-white shadow-lg rounded-2xl p-6">
                <div>
                    <Image
                        src={equipment?.image ? equipment.image : "/Equipment image.png"}
                        alt="Equipment image"
                        width={900}
                        height={400}
                        style={{ borderRadius: "8px" }}
                    />
                </div>
                <div className="w-full p-4">
                    <h2 className="text-green-700 text-xl font-bold">{equipment?.name}</h2>
                    <p className="text-gray-500">Available: <span className="font-bold">5</span></p>
                    <h3 className="text-lg font-bold mt-2">
                        {` Free ${equipment?.name} Support for Those in Need`}
                    </h3>
                    <p className="text-green-600 font-semibold">
                        Empowering Mobility, Changing Lives
                    </p>
                    <p className="text-gray-700 mt-2">
                      {  `We believe in making mobility accessible to everyone. Our ${equipment?.name}s are available completely free of cost to patients who need support. Whether it's for short-term recovery or long-term assistance, we're here to help.`}
                    </p>
                    <div className="flex flex-col gap-2 mt-4 ">
                        <form onSubmit={makeRequest} className="space-y-5">
                        <TextField required fullWidth label="Enter Your Adress" variant="outlined" size="small" onChange={(e)=>setAdress(e.target.value)}/>
                        <Button variant="contained" color="success" type="submit">Make a Request</Button>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipmentbyId
