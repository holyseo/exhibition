import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Exhibition from "./pages/Exhibition.jsx";
import Nav from "./pages/Nav.jsx";
import Collection from "./pages/Collection.jsx";
import { ObjectDetails } from "./components/ObjectDetails.jsx";
import {
  AuthProvider,
  ExhibitionContextProvider,
  MuseumContextProvider,
} from "./context/ContextProvider.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ExhibitionContextProvider>
        <MuseumContextProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<Search />} />
              <Route path="/exhibition" element={<Exhibition />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/object/:id" element={<ObjectDetails />} />
            </Routes>
          </BrowserRouter>
        </MuseumContextProvider>
      </ExhibitionContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
