/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { Navigate } from "react-router-dom";

const api = "http://localhost:8080/auth/login";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const getUser = () => {
    return localStorage.getItem("user");
  };

  const [user, setUser] = useState(getUser());

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
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData && userData.email) {
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

  // Sign out a user
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, getUser, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}

export const RequireAuth = ({ children, value }) => {
  const auth = useAuthValue();

  // TODO ─ Realizar uma requisição de verdade para o back para saber se o usuário está autenticado
  if (!auth.getUser()) {
    return <Navigate to={value} />;
  }

  return children;
};

export const RequireNoAuth = ({ children }) => {
  const auth = useAuthValue();

  if (auth.getUser()) {
    return <Navigate to="/cars" />;
  }

  return children;
};
