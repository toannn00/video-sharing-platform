import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import "./App.css";
import PostVideo from "./routes/PostVideo";
import Guard from "./routes/Guard";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { message } from "antd";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_WS_URL);
    setSocket(newSocket);
  }, [setSocket]);

  const email = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token");

  const messageListener = (notification: {
    message: string;
    email: string;
  }) => {
    if (token && notification.email !== email) {
      message.info(notification.message);
    }
  };

  useEffect(() => {
    socket?.on("newVideoNotification", messageListener);
    return () => {
      socket?.off("newVideoNotification", messageListener);
    };
  }, [messageListener, socket]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="post"
            element={
              <Guard>
                <PostVideo />
              </Guard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
