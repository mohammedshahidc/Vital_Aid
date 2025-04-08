"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDoctorUser } from "@/lib/Query/hooks/useDocterUser";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import { initializeSocket, socket } from "@/lib/socket/socketinstanc";
import { GrSend } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "@/lib/Query/hooks/doctorById";
import Image from "next/image";
import Link from "next/link";

interface Doctor {
  doctor: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  profileImage?: string;
}

interface Message {
  senderId: string;
  senderModel: "User" | "Doctor";
  receiverId: string;
  receiverModel: "User" | "Doctor";
  message: string;
  createdAt: string;
}
interface DoctorData {
  description: string;
  doctor: Doctor;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
}

const Message = () => {
  const { doctors } = useDoctorUser();
  const { user } = useAppSelector((state) => state.auth);

  const doctorsList: Doctor[] = useMemo(
    () => (Array.isArray(doctors?.data?.data) ? doctors.data.data : []),
    [doctors]
  );
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctorsList);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor["doctor"] | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [receivedMsgs] = useState(new Set());

  const { data } = useQuery<DoctorData>({
    queryKey: ["doctor", selectedDoctor?._id],
    queryFn: () => fetchDoctorById(selectedDoctor?._id as string),
    enabled: !!selectedDoctor?._id,
  });

  console.log(data);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setFilteredDoctors(
      doctorsList.filter((d) =>
        d?.doctor?.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, doctorsList]);

  useEffect(() => {
    if (user?.id) {
      const cleanup = initializeSocket(user.id, "User");
      return () => {
        cleanup();
      };
    }
  }, [user?.id]);

  useEffect(() => {
    const handleReceiveMessage = (msg: Message) => {
      if (
        msg.senderId === selectedDoctor?._id &&
        !receivedMsgs.has(JSON.stringify(msg))
      ) {
        receivedMsgs.add(JSON.stringify(msg));
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedDoctor, receivedMsgs]);

  useEffect(() => {
    if (selectedDoctor) {
      axiosInstance
        .get(`/users/messageof/${user?.id}/${selectedDoctor._id}`)
        .then((res) => setMessages(res.data.data))
        .catch((err) => console.error("Error fetching chat:", err));
    }
  }, [selectedDoctor, user?.id]);
  interface FormatTime {
    (timestamp: string): string;
  }

  const formatTime: FormatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    const msgData: Message = {
      senderId: user?.id || "",
      senderModel: "User",
      receiverId: selectedDoctor._id,
      receiverModel: "Doctor",
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    try {
      setMessages((prev) => [...prev, msgData]);
      await axiosInstance.post("/users/sendmsg", msgData);
      socket.emit("sendMessage", msgData);
      setNewMessage("");
    } catch (err) {
      console.error("Message send error:", err);
    }
  }, [newMessage, selectedDoctor, user?.id]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 -mt-16">
      <div className="w-1/4 bg-white border-r border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Chat with Doctors
          </h2>
          <Link href={"/user"}>Back</Link>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 scrollbar-none">
          {filteredDoctors.length > 0 ? (
            <ul className="space-y-2">
              {filteredDoctors.map((doctor) => (
                <li
                  key={doctor.doctor._id}
                  className={`p-3 cursor-pointer rounded-lg transition-all duration-200 
                    ${
                      selectedDoctor?._id === doctor.doctor._id
                        ? "bg-green-100 border-l-4 border-green-500"
                        : "hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedDoctor(doctor.doctor)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                      <Image
                        src={
                          doctor?.profileImage ||
                          "https://i.pinimg.com/736x/bb/74/ba/bb74bae0879782206e5970e65efcfaa6.jpg"
                        }
                        alt={doctor?.doctor?.name || "Doctor profile"}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {doctor?.doctor?.name || "Doctor Name"}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {doctor?.doctor?.email || "doctor@example.com"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No doctors found</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-green-500 mt-2 text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-3/4 flex flex-col bg-white">
        {selectedDoctor ? (
          <>
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shadow-sm">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                <Image
                  src={
                    data?.profileImage ||
                    "https://i.pinimg.com/736x/bb/74/ba/bb74bae0879782206e5970e65efcfaa6.jpg"
                  }
                  alt={selectedDoctor.name}
                  width={50}
                  height={50}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedDoctor.name}
                </h2>
                {data?.specialization && data.specialization.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {data.specialization.join(", ")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 scrollbar-none">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.senderId === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[50%] break-words shadow-sm ${
                        msg.senderId === user?.id
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs text-black mt-1 text-right">
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <GrSend size={24} className="text-green-500" />
                  </div>
                  <p className="text-center">
                    Start your conversation with Dr. {selectedDoctor.name}
                  </p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <GrSend size={20} className="text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <GrSend size={36} className="text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Welcome to VitalAid Chat
            </h3>
            <p className="text-center max-w-md">
              Select a doctor from the list to start a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
