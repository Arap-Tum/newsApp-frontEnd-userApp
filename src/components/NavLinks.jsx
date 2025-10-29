// NavLinks.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react"; // or any icon library
import { useArticleCategories } from "../hooks/useCattegoriesService";
import { useArticleCounties } from "../hooks/useCounties";

export const NavLinks = ({ isSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: categories } = useArticleCategories();
  const { data: counties } = useArticleCounties();

  // console.log("Categories ", categories);

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

      {/* ✅ Counties Dropdown */}
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
          {(counties || []).map((county) => (
            <li key={county.id || county.name}>
              <Link to={`/county/${county.name.toLowerCase()}`}>
                {county.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li>
        <Link to="/global">Global</Link>
      </li>

      {/* ✅ Categories Dropdown */}
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
          {(categories || []).map((category) => (
            <li key={category.id || category.name}>
              <Link to={`/category/${category.name.toLowerCase()}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
