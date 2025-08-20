// helper function to call our Netlify function
const fetchEverything = async (query) => {
  try {
    const res = await fetch(`/.netlify/functions/getNews?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

// Categories
export const ukraineNews = await fetchEverything("ukraine war");
export const aiNews = await fetchEverything("artificial intelligence");
export const worldPoliticsNews = await fetchEverything(
  "politics OR government OR election OR international relations"
);

export const technologyNews = await fetchEverything("technology");
export const globalBusinessNews = await fetchEverything("business");
export const globalSportsNews = await fetchEverything("sports"); // typo fix
export const entertainmentNews = await fetchEverything("entertainment");
export const healthNews = await fetchEverything("health");
