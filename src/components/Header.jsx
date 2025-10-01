import React, { useState } from "react";
import "../styles/header.css";
import { Menu } from "lucide-react"; // Hamburger & Close icons
import { SideBar } from "./SideBar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="header">
        <button
          className="hamburger-menu"
          onClick={() => setIsSidebarOpen(true)} // ✅ function, not direct call
        >
          <Menu size={24} />
        </button>
        <h1 className="logo">The Rift News</h1>

        <div style={{ position: "absolute", right: "0", zIndex: " 1000" }}>
          <Link to="/login">
            <User color="black" size={24} />
          </Link>
        </div>
      </header>

      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)} // ✅ wrapped in arrow function
        ></div>
      )}
    </>
  );
};
