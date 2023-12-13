import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Cars from "./screens/Cars";
import { useAuthValue } from "./context/AuthContext";
import ListCars from "./screens/ListCars";
import RegisterAnuncio from "./screens/RegisterAnuncio";
import UpdateCar from "./screens/UpdateCar";

function App() {
  const { getUser } = useAuthValue();
  const [user] = useState(getUser());

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/cars"
              element={user ? <ListCars /> : <Navigate to="/login" />}
            />
            <Route
              path="/register/car"
              element={user ? <Cars /> : <Navigate to="/login" />}
            />
            <Route
              path="/register/anuncio/:id"
              element={user ? <RegisterAnuncio /> : <Navigate to="/login" />}
            />
            <Route
              path="/car/editar/:id"
              element={user ? <UpdateCar /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
