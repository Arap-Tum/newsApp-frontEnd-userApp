import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/global">Global</Link></li>
        <li><Link to="/politics">Politics</Link></li>
        <li><Link to="/business">Business</Link></li>
        <li><Link to="/technology">Technology</Link></li>
        <li><Link to="/sports">Sports</Link></li>
        <li><Link to="/entertainment">Entertainment</Link></li>
        <li><Link to="/health">Health</Link></li>
      </ul>
    </nav>
  );
};
