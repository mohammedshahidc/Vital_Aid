"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { useFormik } from 'formik'
import { userSchema } from "@/schema/userSchema";
import { userRegistration } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  conformPassword: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  conformPassword: ''
}
const Register = () => {
  const dispatch = useAppDispatch()
  const { data } = useSession();
  const [loading, setloading] = useState(false)
  const router = useRouter()
  if (data) {
    console.log('rh',data);
  }
  const { errors, handleChange, handleSubmit, values, touched, resetForm, handleBlur } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async () => {
      setloading(true)
      try {
        const result = await dispatch(userRegistration(values));
        if (result.meta.requestStatus === 'fulfilled') {
          router.push('/login');
        }

        await console.log('user:', values);
        resetForm()
      } catch (error) {

        console.log(error);

      }
    }

  })
  return (
    <div className="flex justify-center items-center h-screen bg-white w-screen">
      <div className=" w-5/6 shadow-xl rounded-lg overflow-hidden sm:w-4/6 md:w-3/5 flex">
        {/* Left Panel */}
        <div className="hidden sm:block bg-gradient-to-tr from-emerald-700 to-green-400  w-1/2 h-auto">
          <p className="text-white font-serif mt-16 ml-14 font-bold text-xl">
            Create an Account
          </p>
          <div className="ml-14 mt-16 space-y-2 font-bold font-mono">
            <p>Join Us to Build a</p>
            <p>Healthier Tomorrow -</p>
            <p>Together, Every Step</p>
            <p>Counts!</p>
          </div>
          <button className="w-fit p-1 bg-gray-200 text-black rounded-lg font-thin mt-14 ml-12">
            Learn more
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-gray-300  w-full sm:w-1/2 p-4 sm:p-5 sm:flex sm:flex-col sm:justify-between">
          <div className="w-full text-black">
            <form className="space-y-3 sm:space-y-2" onSubmit={handleSubmit}>
              <div>
                <label >Full Name</label>
                <br />
                <input
                  id="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="enter your name"
                  type="text"
                  className="border border-gray-400 w-full h-10 pl-2 rounded-md"
                />
                <br />
                {errors?.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label>Email</label>
                <br />
                <input
                  id="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                   placeholder="enter email address"
                  type="text"
                  className="border border-gray-400 w-full h-10 pl-2 rounded-md"
                />
                <br />
                {errors?.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label>Mobile Number</label>
                <br />
                <input
                  id="phone"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                   placeholder="phone number"
                  type="text"
                  className="border border-gray-400 w-full h-10 pl-2 rounded-md"
                />
                <br />
                {errors?.phone && touched.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="w-full sm:flex sm:space-x-4">
                <div className="sm:w-1/2">
                  <label className="sm:text-sm">Password</label>
                  <br />
                  <input
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                     placeholder="Type a password"
                    type="password"
                    className="border border-gray-400 w-full h-10 pl-2 rounded-md"
                  />
                  {errors?.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <div className="sm:w-1/2 mt-4 sm:mt-0">
                  <label className="sm:text-sm">Confirm Password</label>
                  <br />
                  <input
                    id="conformPassword"
                    value={values.conformPassword}
                     placeholder="Confirm thepassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    className="border border-gray-400 w-full h-10 pl-2 rounded-md"
                  />
                  {errors?.conformPassword && touched.conformPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.conformPassword}</p>
                  )}
                </div>
              </div>
              <div className="w-full pt-8 space-y-3 sm:space-y-4">
                <button
                  className={`w-full bg-lime-600 h-10 font-bold text-white text-lg rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Create an account'}
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 text-sm"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <FcGoogle size={25} className="inline-block mr-2" />
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
