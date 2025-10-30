import axios from "./api";
import { API_URI } from "./localApi";
//GET SCRAPED NEWS
export const getScrappedArticles = () => axios.get("/scraped");

//GET API NEWS
export async function getGlobalNews() {
  try {
    const response = await fetch(`${API_URI}/news`);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    console.log("📰 News data from backend:", data);

    // ✅ Access .articles since backend wraps it in { articles: [...] }
    const articles = data.articles || [];

    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
