import axios from "./api";

//GET SCRAPED NEWS
export const getScrappedArticles = () => axios.get("/scraped");

//GET API NEWS
export const getExternalPolitics = () => axios.get("/services/politics");
export const getKenyanNews = () => axios.get("/services/kenya");
export const getExternalWorldPolitics = () =>
  axios.get("/services/wordPolitics");
