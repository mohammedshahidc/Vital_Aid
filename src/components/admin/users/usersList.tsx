"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import axiosInstance from "@/utils/axios";
import { FaBan, FaCheckCircle } from "react-icons/fa";

function UsersList() {
  const dispatch = useAppDispatch();
  const { isLoading, error, users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockUser = async (_id: string) => {
    try {
      const response = await axiosInstance.post(`/users/blockUser/${_id}`);
      console.log(response.data.message);
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        Users List
      </h2>

      {isLoading && <p className="text-gray-500 dark:text-gray-300 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-gray-700 dark:text-white">Profile</th>
              <th className="border p-3 text-gray-700 dark:text-white">Name</th>
              <th className="border p-3 text-gray-700 dark:text-white">Email</th>
              <th className="border p-3 text-gray-700 dark:text-white">Phone</th>
              <th className="border p-3 text-gray-700 dark:text-white">Status</th>
              <th className="border p-3 text-gray-700 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="border p-3">
                  <div className="flex justify-center">
                    <img
                      src={user.profileImage.thumbnail || "/default-avatar.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{user.name}</td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">{user.phone}</td>
                <td className="border p-3">
                  <div className="flex justify-center items-center">
                    {user.isDeleted || user.blocked ? (
                      <span className="text-red-500 flex items-center">
                        <FaBan className="mr-1" /> Blocked
                      </span>
                    ) : (
                      <span className="text-green-500 flex items-center">
                        <FaCheckCircle className="mr-1" /> Active
                      </span>
                    )}
                  </div>
                </td>
                <td className="border p-3">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300 w-32 flex items-center justify-center gap-2
                      bg-red-500 hover:bg-red-600 disabled:bg-gray-400"
                    >
                      {user.blocked ? (
                        <>
                          <FaCheckCircle className="text-white" /> Unblock
                        </>
                      ) : (
                        <>
                          <FaBan className="text-white" /> Block
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;