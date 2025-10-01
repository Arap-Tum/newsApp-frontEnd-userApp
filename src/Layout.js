// Layout.js
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Search } from "./components/Search";

export default function Layout({ allArticles }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Header />
      {!isMobile && <Navbar />}

      <Search allArticles={allArticles} />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
