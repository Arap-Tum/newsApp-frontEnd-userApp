import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useArticleCategories } from "../hooks/useCattegoriesService";
import { useArticleCounties } from "../hooks/useCounties";
import "../styles/footer.css";
export const Footer = () => {
  const { data: categories } = useArticleCategories();
  const { data: counties } = useArticleCounties();

  return (
    <footer className="footer">
      {/* ─── TOP SECTION ───────────────────────────── */}
      <div className="footer__top">
        {/* ── Branding Section ── */}
        <div className="footer__brand">
          <h2 className="footer__logo">The Rift News</h2>
          <p className="footer__tagline">
            Reliable stories. Authentic voices. The pulse of the Rift.
          </p>
        </div>

        {/* ── Navigation Columns ── */}
        <nav className="footer__nav">
          {/* Explore Column */}
          <div className="footer__nav-column">
            <h3 className="footer__nav-title">Explore</h3>
            <ul className="footer__nav-list">
              <li>
                <Link to="/" className="footer__nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/local" className="footer__nav-link">
                  Kenya
                </Link>
              </li>
              <li>
                <Link to="/global" className="footer__nav-link">
                  Global
                </Link>
              </li>
            </ul>
          </div>

          {/* Counties Column */}
          <div className="footer__nav-column">
            <h3 className="footer__nav-title">Counties</h3>
            <ul className="footer__nav-list">
              {(counties || []).slice(0, 5).map((county) => (
                <li key={county.id || county.name}>
                  <Link
                    to={`/county/${county.name.toLowerCase()}`}
                    className="footer__nav-link"
                  >
                    {county.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div className="footer__nav-column">
            <h3 className="footer__nav-title">Categories</h3>
            <ul className="footer__nav-list">
              {(categories || []).slice(0, 5).map((category) => (
                <li key={category.id || category.name}>
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
                    className="footer__nav-link"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Contact / Social ── */}
        <div className="footer__contact">
          <h3 className="footer__nav-title">Connect</h3>
          <ul className="footer__social-list">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <Facebook size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <Twitter size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <Instagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@theriftnews.com"
                className="footer__social-link"
              >
                <Mail size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── BOTTOM SECTION ───────────────────────────── */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} The Rift News. All rights reserved.
        </p>
        <div className="footer__legal-links">
          <Link to="/privacy" className="footer__legal-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer__legal-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
