import { useState, useEffect } from "react";

export const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const handleStorageChange = () => {
      setEmail(localStorage.getItem("email") || "");
      setToken(localStorage.getItem("token") || "");
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  return { email, token };
};
