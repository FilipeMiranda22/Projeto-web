import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Cars from "./screens/Cars";
import {
  RequireAuth,
  RequireNoAuth,
  useAuthValue,
} from "./context/AuthContext";
import ListCars from "./screens/ListCars";
import RegisterAnuncio from "./screens/RegisterAnuncio";
import UpdateCar from "./screens/UpdateCar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <RequireNoAuth>
                  <Register />
                </RequireNoAuth>
              }
            />
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/cars"
              element={
                <RequireAuth value="/login">
                  <ListCars />
                </RequireAuth>
              }
            />
            <Route
              path="/register/car"
              element={
                <RequireAuth value="/login">
                  <Cars />
                </RequireAuth>
              }
            />
            <Route
              path="/register/anuncio/:id"
              element={
                <RequireAuth value="/login">
                  <RegisterAnuncio />
                </RequireAuth>
              }
            />
            <Route
              path="/car/editar/:id"
              element={
                <RequireAuth value="/login">
                  <UpdateCar />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
