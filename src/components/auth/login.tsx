"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams, useRouter } from "next/navigation";
import {
  loginUser,
  loginadmin,
  loginDoctor,
  setType,
} from "@/lib/store/features/userSlice";
import LoginModal from "../ui/loginModal";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import axiosErrorManager from "@/utils/axiosErrormanager";
interface GoogleUser {
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

interface Session {
  user?: GoogleUser;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { admin } = useParams();
  const { isLoading, error, userType } = useAppSelector((state) => state.auth);
  const { data :session} = useSession();
  const router = useRouter();
  const role = localStorage.getItem("user");
  const dispatch = useAppDispatch();
   const [googleRegistered, setGoogleRegistered] = useState(false);

  const btnColor =
    userType == "Admin" ? "info" : userType == "Doctor" ? "primary" : "success";

  const gradientColor =
    userType === "Admin"
      ? "from-purple-300 via-purple-400 to-purple-500"
      : userType === "Doctor"
      ? "from-blue-300 via-blue-400 to-blue-500"
      : " from-custom-green-100 via-custom-green-200 to-custom-green-300";

  useEffect(() => {
    if (admin) {
      dispatch(setType("Admin"));
    }
  }, [dispatch, admin]);

  useEffect(() => {
    if (session && !googleRegistered) {
      if (session) {
        googleLogin(session);
      }
      setGoogleRegistered(true);
    }
  }, [session, googleRegistered]);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result =
      userType == "User"
        ? await dispatch(loginUser({ email, password }))
        : userType == "Admin"
        ? await dispatch(loginadmin({ email, password }))
        : await dispatch(loginDoctor({ email, password }));

    if (error) {
      console.error(error);
    }

    if (result.meta.requestStatus == "fulfilled") {
      if (role && role === "User") {
        router.push("/user");
      }
      if (role && role === "Doctor") {
        router.push("/doctor");
      }
      if (role && role === "Admin") {
        router.push("/admin");
      }
    }
  };
  if (error) {
    console.error(error);
  }

  const handleClick = async () => {
    await dispatch(setType("Doctor"));
  };



 
  const googleLogin = async (session: Session) => {
    try {
      if (!session?.user) return;
      const googleUser = session.user;
      const dispatchResult = await dispatch(
        loginUser({ email: googleUser.email, password: googleUser.name })
      );

      if (dispatchResult.meta.requestStatus === "fulfilled") {
        if (role && role === "User") {
          router.push("/user");
        }
      } else {
        console.error("Login failed, please try again.");
      }
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  return (
    <div
      className={`relative flex h-screen items-center justify-center bg-gray-100`}
    >
      <div className="flex w-full  max-w-4xl sm:h-5/12 bg-gray-50 shadow-lg flex-col sm:flex-row rounded-lg">
        <div className="w-full md:pt-20 sm:w-1/2 px-8 py-12 sm:p-8">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-2">
            WELCOME BACK
          </h2>

          <p className="text-center text-xs text-gray-400 mb-6">
            Please enter your credentials to log in.
          </p>
          <form
            className="space-y-6 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center w-full">
              <label
                className="flex flex-col items-start ml-24 text-gray-600 text-sm mb-2 w-full"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-3/4 px-4 py-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <label
                className="flex flex-col items-start ml-24 text-gray-600 text-sm mb-2 w-full"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-3/4 px-4 py-2 text-black border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color={`${btnColor}`}
              className={`w-3/4 ${btnColor}`}
            >
              {isLoading ? "Loading..." : `Login as ${userType}`}
            </Button>
            <button
              type="button"
              className="w-3/4 bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 text-sm"
              onClick={ () => {
                signIn("google");
                
              }}
            >
              <FcGoogle size={25} className="inline-block mr-2" />
              Continue with Google
            </button>

        

            <div className="my-4 w-ful">
              {userType == "User" && (
                <Link
                  href={"/login/doctor"}
                  className="text-blue-700 end-3 "
                  onClick={handleClick}
                >
                  login as a doctor
                </Link>
              )}
            </div>
          </form>

          {userType === "User" && (
            <div className="sm:hidden mt-2 flex  items-center justify-center space-y-4">
              <p className="text-gray-700 mt-3 text-base font-medium">
                Dont have an account yet?
              </p>
              <Link href="/register" passHref>
                <Button variant="text" color="success">
                  Create it
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div
          className={`hidden rounded-lg sm:flex w-full sm:w-1/2 p-8 bg-gradient-to-b ${gradientColor} items-center justify-center h-full sm:h-auto`}
        >
          <div className="text-center">
            {userType === "Admin" ? (
              <div>
                <p className="text-white text-2xl sm:text-xl font-medium font-serif mb-4">
                  Welcome Admin
                </p>
                <p className="text-white text-2xl sm:text-xl font-medium font-serif mb-4">
                  Manage, Monitor, and Optimize with Ease
                </p>
              </div>
            ) : userType === "Doctor" ? (
              <div className=" justify-center">
                <p className="text-white text-2xl sm:text-xl font-medium font-serif">
                  Welcome Doctor
                </p>
                <Image src="/Doctor.png" alt="drimg" width={200} height={200} />
              </div>
            ) : (
              <p className="text-white text-2xl sm:text-xl font-medium font-serif mb-4">
                Dont have an account yet?
              </p>
            )}
            {userType === "User" && (
              <Link href="/register" passHref>
                <Button variant="contained" color="inherit">
                  Create it
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <LoginModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Login;
