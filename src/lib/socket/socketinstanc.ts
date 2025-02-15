
import io from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});

export const initializeSocket = (userId: string, role: "User" | "Doctor") => {
  if (!socket.connected) {
    socket.connect();
  }

  socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    socket.emit("joinRoom", { userId, role });
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return () => {
    socket.disconnect();
  };
};