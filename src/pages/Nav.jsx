import { Link } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../context/ContextProvider";

const Nav = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="bg-[#2f3640] p-16 text-white text-2xl font-mono text- font-extrabold flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-around w-full ">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <Link to="/collection">Collection</Link>
          </div>
          <div>
            <Link to="/exhibition">Exhibition</Link>
          </div>
          <div>
            {user ? (
              <button onClick={() => supabase.auth.signOut()}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
