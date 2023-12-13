/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { Navigate } from "react-router-dom";

const api = "http://localhost:8080/auth/login";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const login = async (data) => {
    console.log(data.email);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        console.log(response);
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData && userData.email) {
          console.log(userData.email);
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Get the authentication token
  const getUser = () => {
    return localStorage.getItem("user");
  };

  // Sign out a user
  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedOut(true); // Atualiza o estado para true após o logout
  };

  return (
    <AuthContext.Provider value={{ login, getUser, logout }}>
      {isLoggedOut ? <Navigate to="/" /> : children}{" "}
      {/* Força a renderização após o logout */}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
