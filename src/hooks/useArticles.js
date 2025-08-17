// hooks/useArticles.js
import { useState, useEffect } from "react";
import { getArticles } from "../api/articles";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getArticles();
        setArticles(res.data);
      } catch (err) {
        console.error("❌ Articles error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { articles, loading };
}
