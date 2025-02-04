"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import axiosInstance from "@/utils/axios";
import { FaBan } from "react-icons/fa";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
  profileImage: {
    originalProfile: string;
    thumbnail: string;
  };
}

const BlockedUsersList: React.FC = () => {
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axiosInstance.get<{ users: User[] }>(
          "/users/getblockedUsers"
        );
        setBlockedUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblockUser = async (_id: string) => {
    try {
      await axiosInstance.post(`/users/blockUser/${_id}`);
      dispatch(fetchUsers(1));
      setBlockedUsers((prev) => prev.filter((user) => user._id !== _id));
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="p-6 h-screen max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        Blocked Users
      </h2>

      {isLoading && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          Loading...
        </p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-center">Profile</th>
              <th className="border p-3 text-center">Name</th>
              <th className="border p-3 text-center">Email</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blockedUsers.map((user) => (
              <tr
                key={user._id}
                className="border hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
              >
                <td className="border pl-8 ">
                  <Image
                    src={user.profileImage.thumbnail}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="flex items-center justify-center text-red-500 p-3">
                  <FaBan className="mr-1" /> Blocked
                </td>
                <td className="border p-3">
                  <button
                    onClick={() => handleUnblockUser(user._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {blockedUsers.length === 0 && !isLoading && (
        <p className="text-gray-500 dark:text-gray-300 mt-4 text-center">
          No blocked users found.
        </p>
      )}
    </div>
  );
};

export default BlockedUsersList;
