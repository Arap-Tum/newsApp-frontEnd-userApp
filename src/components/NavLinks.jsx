// components/NavLinks.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavLinks = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <ul className="nav-links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/local">Kenya</Link>
      </li>

      {/* Dropdown */}
      <li className="dropdown">
        <p onClick={toggleDropdown} className="dropdown-toggle">
          Counties ▾
        </p>
        <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
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
      <li className="dropdown">
        <p onClick={toggleDropdown} className="dropdown-toggle">
          More ▾
        </p>
        <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
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
    </ul>
  );
};
