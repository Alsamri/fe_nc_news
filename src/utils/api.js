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

export const getArticleCommentsById = (id) => {
  return axios
    .get(`${main_url}/articles/${id}/comments`)
    .then((response) => response.data.comment)
    .catch((error) => {
      console.error("Error fetching comments details", error);
      throw error;
    });
};

export const patchArticleVotes = (id, voteCount) => {
  return axios
    .patch(`${main_url}/articles/${id}`, { inc_votes: voteCount })
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error updating votes", error);
      throw error;
    });
};

export const postComments = (id, username, body) => {
  return axios
    .post(`${main_url}/articles/${id}/comments`, { username, body })
    .then((response) => response.data.comment)
    .catch((error) => {
      console.error("Error posting comment", error);
      throw error;
    });
};
