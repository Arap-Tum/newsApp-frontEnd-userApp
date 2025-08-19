import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";
import "../styles/footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const TwitterIcon = () => <Twitter size={20} />;
  const FacebookIcon = () => <Facebook size={20} />;
  const InstagramIcon = () => <Instagram size={20} />;
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Branding */}
        <div className="footer-branding">
          <h2 className="footer-logo">THE PHANTOM NEWS</h2>
          <p className="footer-tagline">Truth beyond the headlines.</p>
        </div>

        {/* Navigation */}
        <nav className="footer-navigation">
          <h3 className="footer-heading">Sections</h3>
          <ul className="footer-links">
            <li>
              <a href="/politics">Politics</a>
            </li>
            <li>
              <a href="/business">Business</a>
            </li>
            <li>
              <a href="/technology">Technology</a>
            </li>
            <li>
              <a href="/health">Health</a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav className="footer-legal">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Use</a>
            </li>
            <li>
              <a href="/cookies">Cookie Policy</a>
            </li>
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-heading">Stay Informed</h3>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {currentYear} THE PHANTOM NEWS. All rights reserved.</p>
        <div className="social-links">
          <a href="#f" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#f" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#int" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
