import { Link } from "react-router-dom";
import "../styles/navBar.css";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/local">Kenya</Link>
        </li>
        <li>
          <Link to="/global">General</Link>
        </li>
        <li>
          <Link to="/politics"> Global Politics</Link>
        </li>
        <li>
          <Link to="/business">Global Business</Link>
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

        <li>
          <Link to="/health">Ukraine</Link>
        </li>
      </ul>
    </nav>
  );
};
