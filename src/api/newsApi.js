const API_BASE = "https://news-72me.onrender.com"; 

const fetchEverything = async (query) => {
  try {
    const res = await fetch(`${API_BASE}/api/news?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

// Hot topics
export const ukraineNews = await fetchEverything("ukraine war");
export const aiNews = await fetchEverything("artificial intelligence");
export const worldPoliticsNews = await fetchEverything(
  "politics OR government OR election OR international relations"
);

// World categories
export const technologyNews = await fetchEverything("technology");
export const globalBusinessNews = await fetchEverything("business");
export const globalSportsNews = await fetchEverything("sports"); // fixed typo
export const entertainmentNews = await fetchEverything("entertainment");
export const healthNews = await fetchEverything("health");
