// NavLinks.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react"; // or any icon library

export const NavLinks = ({ isSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <ul className="nav-links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/local">Kenya</Link>
      </li>
      <li>
        <button
          className="dropdown-toggle"
          onClick={() => handleToggle("counties")}
        >
          Counties
          {isSidebar ? (
            <ChevronRight
              className={`icon ${openDropdown === "counties" ? "rotate" : ""}`}
              size={16}
            />
          ) : (
            <ChevronDown
              className={`icon ${openDropdown === "counties" ? "rotate" : ""}`}
              size={16}
            />
          )}
        </button>
        <ul className={`dropdown ${openDropdown === "counties" ? "open" : ""}`}>
          <li>
            <Link to="/nandi">Nandi</Link>
          </li>
          <li>
            <Link to="/turkana">Turkana</Link>
          </li>
          <li>
            <Link to="/baringo">Baringo</Link>
          </li>
          <li>
            <Link to="/bomet">Bomet</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/global">General</Link>
      </li>
      <li>
        <Link to="/politics">Politics</Link>
      </li>
      <li>
        <Link to="/business">Business</Link>
      </li>

      <li>
        <button
          className="dropdown-toggle"
          onClick={() => handleToggle("more")}
        >
          More
          {isSidebar ? (
            <ChevronRight
              className={`icon ${openDropdown === "more" ? "rotate" : ""}`}
              size={16}
            />
          ) : (
            <ChevronDown
              className={`icon ${openDropdown === "more" ? "rotate" : ""}`}
              size={16}
            />
          )}
        </button>
        <ul className={`dropdown ${openDropdown === "more" ? "open" : ""}`}>
          <li>
            <Link to="/technology">Technology</Link>
          </li>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/entertainment">Entertainment</Link>
          </li>
          <li>
            <Link to="/health">Health</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};
