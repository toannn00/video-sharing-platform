import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import "./App.css";
import PostVideo from "./routes/PostVideo";
import Guard from "./routes/Guard";
import { Socket } from "socket.io-client";
import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { message } from "antd";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const { email, token } = useAuth();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_WS_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const messageListener = useCallback(
    (notification: { message: string; email: string }) => {
      if (token && notification.email !== email) {
        message.info(notification.message);
      }
    },
    [token, email]
  );

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
