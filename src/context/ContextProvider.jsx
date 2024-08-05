import { createContext, useState } from "react";

export const MuseumContext = createContext();
export const ExhibitionContext = createContext();

export const MuseumContextProvider = ({ children }) => {
  const [museum, setMuseum] = useState("");
  return (
    <MuseumContext.Provider value={{ museum, setMuseum }}>
      {children}
    </MuseumContext.Provider>
  );
};

export const ExhibitionContextProvider = ({ children }) => {
  const [exhibition, setExhibition] = useState([]);
  return (
    <ExhibitionContext.Provider value={{ exhibition, setExhibition }}>
      {children}
    </ExhibitionContext.Provider>
  );
};
