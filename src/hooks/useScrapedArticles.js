import { useState, useEffect } from "react";

import { getScrappedArticles } from "../api/externallNews";

export function useScrapped() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getScrappedArticles();
        setArticles(res.data);
        console.log("Fetched scraped articles:", res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { articles, loading };
}
