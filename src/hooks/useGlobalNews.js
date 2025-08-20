// hooks/useGlobalNews.js
import { useEffect, useState } from "react";
import { globalBusinessNews, globalSportsNews, technologyNews, worldPoliticsNews, ukraineNews, entertainmentNews, healthNews } from "../api/newsApi";

export function useGlobalNews() {
  const [news, setNews] = useState({
    business: [],
    technology: [],
    sports: [],
    politics: [],
    entertainment: [],
    ukraine: [],
    health: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
         setLoading(true);
        const [business, technology, sports, politics, entertainment, ukraine, health ]= await Promise.all([
          globalBusinessNews,
          technologyNews,
          globalSportsNews,
          entertainmentNews,
          worldPoliticsNews,
          healthNews,
          ukraineNews
        ]);
        setNews({ business, technology, sports, politics, ukraine, entertainment, health });
      } catch (err) {
        console.error("❌ Global news error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { news, loading };
}
