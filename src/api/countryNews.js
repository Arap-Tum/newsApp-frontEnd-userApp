/* const externalNews = async function (category, country = 'us', language = 'en') {
  const apiKey = '4a2dd920a0064a2fb656294313963032';
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${language}&apiKey=${apiKey}`
  );
  const data = await response.json();
  return data.articles;
}
 */
// US Sports news
// export const sportsNewsUS = await externalNews('sports', 'us');

// Global sports news (remove country filter)
// export const sportsNewsGlobal = await externalNews('sports', null);

// UK Politics news
// export const politicsNewsUK = await externalNews('politics', 'ke');