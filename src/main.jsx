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
  ExhibitionContextProvider,
  MuseumContextProvider,
} from "./context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExhibitionContextProvider>
      <MuseumContextProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/exhibition" element={<Exhibition />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/object/:id" element={<ObjectDetails />} />
          </Routes>
        </BrowserRouter>
      </MuseumContextProvider>
    </ExhibitionContextProvider>
  </React.StrictMode>
);
