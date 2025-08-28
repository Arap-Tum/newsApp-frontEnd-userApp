// hooks/usePoliticsNews.js
import { useEffect, useState } from "react";
import {
  getExternalPolitics,
  getKenyanNews,
  getExternalWorldPolitics,
} from "../api/externallNews";

export function useExternalNews() {
  const [news, setNews] = useState({
    externalPolitics: [],
    kenyan: [],
    worldPolitics: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [externalPoliticsRes, kenyanRes, worldPoliticsRes] =
          await Promise.all([
            getExternalPolitics(),
            getKenyanNews(),
            getExternalWorldPolitics(),
          ]);

        setNews({
          externalPolitics: externalPoliticsRes.data,
          kenyan: kenyanRes.data,
          worldPolitics: worldPoliticsRes.data,
        });

        console.log(
          "✅ Politics news fetched successfully",
          news.externalPolitics
        );
      } catch (err) {
        console.error("❌ Politics news error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [news]);

  return { news, loading };
}
