import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Categories error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { categories, loading };
}