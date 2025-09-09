import "../styles/sideBar.css";
import { X } from "lucide-react";
import { NavLinks } from "./NavLinks";
export const SideBar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button onClick={() => setIsSidebarOpen(false)} className="close-btn">
        <X size={24} />
      </button>
      <nav className="sidebar-nav">
        <NavLinks />
      </nav>
    </aside>
  );
};
