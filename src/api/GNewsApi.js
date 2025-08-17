export const KenyanNews = async () => {
  const apiKey = '7b250ba9e990e477471d07ad621f41f2';
  const response = await fetch(
    `https://gnews.io/api/v4/top-headlines?country=kenya&token=${apiKey}`
  );
  const data = await response.json();
  return data.articles;
}