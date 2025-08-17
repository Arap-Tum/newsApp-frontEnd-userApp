// hooks/useGlobalNews.js
import { useEffect, useState } from "react";
import { globalBusinessNews, globalSportsNews, trumpNews, worldPoliticsNews } from "../api/News.org";

export function useGlobalNews() {
  const [news, setNews] = useState({
    business: [],
    trump: [],
    sports: [],
    politics: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
         setLoading(true);
        const [business, trump, sports, politics] = await Promise.all([
          globalBusinessNews,
          trumpNews,
          globalSportsNews,
          worldPoliticsNews,
        ]);
        setNews({ business, trump, sports, politics });
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
