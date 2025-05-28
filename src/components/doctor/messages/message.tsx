"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import { initializeSocket, socket } from "@/lib/socket/socketinstanc";
import { GrSend } from "react-icons/gr";
import { FaSearch, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  
}
interface FormatTime {
  (timestamp: string): string;
}

interface Message {
  senderId: string;
  senderModel: "User" | "Doctor";
  receiverId: string;
  receiverModel: "User" | "Doctor";
  message: string;
  createdAt: string;
}

const DrMessage = () => {
  const { user: doctor } = useAppSelector((state) => state.auth);
  console.log("hhhhhh",doctor);
  
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [receivedMsgs] = useState(new Set());
  const router=useRouter()

  useEffect(() => {
    if (doctor?.id) {
      axiosInstance
        .get(`/users/msgof/${doctor.id}`)
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [doctor?.id]);

  useEffect(() => {
    if (doctor?.id) {
      const cleanup = initializeSocket(doctor.id, "Doctor");
      return () => {
        cleanup();
      };
    }
  }, [doctor?.id]);

  useEffect(() => {
    if (selectedUser && doctor?.id) {
      axiosInstance
        .get(`/users/messageof/${doctor.id}/${selectedUser._id}`)
        .then((res) => setMessages(res.data.data))
        .catch((err) => console.error("Error fetching chat:", err));
    }
  }, [selectedUser, doctor?.id]);
  
  useEffect(() => {
    const handleReceiveMessage = (msg: Message) => {
      if (
        msg.senderId === selectedUser?._id &&
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
  }, [selectedUser, receivedMsgs]);

 

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser && doctor?.id) {
      const msgData: Message = {
        senderId: doctor.id,
        senderModel: "Doctor",
        receiverId: selectedUser._id,
        receiverModel: "User",
        message: newMessage.trim(),
        createdAt: new Date().toISOString(),
      };

      try {
        setMessages((prev) => [...prev, msgData]);
        socket.emit("sendMessage", msgData);
        setNewMessage("");
        await axiosInstance.post("/users/sendmsg", msgData);
      } catch (err) {
        console.error("Message send error:", err);
        setMessages((prev) => prev.filter((msg) => msg !== msgData));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  const formatTime: FormatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
  
      <div className="w-1/4 bg-white  border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            My Patients
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          {filteredUsers.length > 0 ? (
            <ul className="space-y-2">
              {filteredUsers.map((user) => (
                <li
                  key={user._id}
                  className={`p-3 cursor-pointer rounded-lg transition-all duration-200 
                    ${
                      selectedUser?._id === user._id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {user.name}
                      </h3>
                      {user.email && (
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No patients found</p>
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="text-blue-500 mt-2 text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

   
      <div className="w-3/4 flex flex-col bg-white">
        {selectedUser ? (
          <>

            <div className="bg-blue-400 text-white px-6 py-4 shadow-md" >
              <div className="flex items-center gap-3"onClick={()=>router.push(`/doctor/patient/${selectedUser._id}`)}>
                <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white" />
                </div>
                <div >
                  <h2 className="text-lg font-semibold">
                    Chat with {selectedUser.name}
                  </h2>
                  {selectedUser.phone && (
                    <p className="text-sm text-blue-100">
                      {selectedUser.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 scrollbar-none">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === doctor?.id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[50%] break-words shadow-sm ${
                        msg.senderId === doctor?.id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      {msg.message}
                      <p className="text-xs text-black mt-1 text-right">
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <GrSend size={24} className="text-blue-500" />
                  </div>
                  <p className="text-center">Start your conversation with {selectedUser.name}</p>
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
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <GrSend size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <GrSend size={36} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Doctor Message Center</h3>
            <p className="text-center max-w-md">
              Select a patient from the list to start a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrMessage;