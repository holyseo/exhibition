import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const MuseumContext = createContext();
export const ExhibitionContext = createContext();
export const AuthContext = createContext();

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
