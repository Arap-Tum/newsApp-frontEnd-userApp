/**
 * business | entertainment | general | health | science | sports | technology

 */

const apiKey = "4a2dd920a0064a2fb656294313963032";

/* ===== Fetch Top Headlines (fixed categories ) ===== */
// const fetchTopHeadlines = async (category, language = "en", country = "us") => {
//   const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=${language}&country=${country}&apiKey=${apiKey}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.articles || [];
// };

/* ===== Fetch Global News by Topic (flexible search) ===== */
const fetchEverything = async (query, language = "en", sortBy = "publishedAt") => {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.articles || [];
};

/* =====  Exports ===== */

// Curated headline categories
//===FROM US ===
// export const unitedStatesSportsNews = await fetchTopHeadlines("sports"); // Top headlines from us  on sports 
// export const usTechNews = await fetchTopHeadlines("technology"); 


// Hot topics
//FROM EVERYWHERE 
export const ukraineNews = await fetchEverything("ukraine war");
export const trumpNews = await fetchEverything("donald trump");
export const aiNews = await fetchEverything("artificial intelligence");
export const worldPoliticsNews = await fetchEverything(
  "politics OR government OR election OR international relations"
);

//ADDED to fetch news from every part of the world 
export const technologyNews = await fetchEverything('technology');
export const globalBusinessNews = await fetchEverything("business");
export const globalSportsNews = await fetchEverything("sorts");
export const entertainmentNews = await fetchEverything("entertainment");
export const healthNews = await fetchEverything("health");

