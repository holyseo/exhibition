import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="bg-[#2f3640] p-16 text-white text-2xl font-mono text- font-extrabold flex flex-row justify-between items-center ">
        <div></div>
        <div className="flex flex-row justify-between w-1/2 ">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <Link to="/collection">Collection</Link>
          </div>
        </div>
        <div>
          <Link to="/exhibition">Exhibition</Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
