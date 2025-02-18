import axios from "axios";

const main_url = "https://nc-project-news.onrender.com/api";

export const getArticles = () => {
  return axios
    .get(`${main_url}/articles`)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error("Error fetching articles", error);
      throw error;
    });
};

export const getArticleById = (id) => {
  return axios
    .get(`${main_url}/articles/${id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error fetching article details", error);
      throw error;
    });
};
