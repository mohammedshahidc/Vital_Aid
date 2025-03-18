"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { userSchema } from "@/schema/userSchema";
import { userRegistration } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import axiosErrorManager from "@/utils/axiosErrormanager";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  conformPassword: string;
}
interface GoogleUser {
  name: string;
  email: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  conformPassword: "",
};

const Register = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleRegistered, setGoogleRegistered] = useState(false);

  useEffect(() => {
    if (session?.user && !googleRegistered) {
      if (session?.user?.name && session?.user?.email) {
        googleRegister({ name: session.user.name, email: session.user.email });
      }
      setGoogleRegistered(true);
    }
  }, [session, googleRegistered]);



  const googleRegister = async (googleUser: GoogleUser) => {
    try {
      if (!googleUser) return;
      
      const user = {
        name: googleUser.name,
        email: googleUser.email,
        password: googleUser.name,
        phone: "9999999999",
      };

      const result = await dispatch(userRegistration(user));
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/login");
      }
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    touched,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const result = await dispatch(userRegistration(values));
        if (result.meta.requestStatus === "fulfilled") {
          router.push("/login");
        }
        resetForm();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-white w-screen">
      <div className="w-5/6 shadow-xl rounded-lg overflow-hidden sm:w-4/6 md:w-3/5 flex">
        
        <div className="hidden sm:block bg-gradient-to-tr from-emerald-700 to-green-400 w-1/2 h-auto p-7">
          <p className="text-white font-serif mt-16 ml-14 font-bold text-xl">
            Create an Account
          </p>
          <div className="ml-14 mt-16 space-y-2 text-white">
            <p>Join Us to Build a</p>
            <p>Healthier Tomorrow -</p>
            <p>Together, Every Step</p>
            <p>Counts!</p>
          </div>
          <div className="ml-14 mt-16">
            <Button variant="contained" color="inherit">
              Learn more
            </Button>
          </div>
        </div>

        
        <div className="bg-gray-100 w-full sm:w-1/2 p-4 sm:p-9 sm:flex sm:flex-col sm:justify-between">
          <form className="space-y-3 sm:space-y-2" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              label="Full Name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              margin="dense"
            />
            {errors?.name && touched.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            <TextField
              fullWidth
              id="email"
              label="Email id"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              margin="dense"
            />
            {errors?.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            <TextField
              id="phone"
              fullWidth
              label="Mobile Number"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              margin="dense"
            />
            {errors?.phone && touched.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}

            <div className="w-full sm:flex sm:space-x-4">
              <div className="sm:w-1/2">
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  margin="dense"
                />
                {errors?.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <TextField
                  id="conformPassword"
                  label="Confirm Password"
                  value={values.conformPassword}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  margin="dense"
                />
                {errors?.conformPassword && touched.conformPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.conformPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full pt-8 space-y-3 sm:space-y-4">
              <Button
                variant="contained"
                color="success"
                className={`w-full h-10 font-bold text-white text-lg rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Create an account"}
              </Button>
              <button
                type="button"
                className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 text-sm"
                onClick={() => signIn("google")}
              >
                <FcGoogle size={25} className="inline-block mr-2" />
                Continue with Google
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
