import axios from "axios";

const main_url = "https://nc-project-news.onrender.com/api";

export const getArticles = ({ sortBy = "created_at", order = "desc" }) => {
  return axios
    .get(`${main_url}/articles?sort_by=${sortBy}&order=${order}`)
    .then((response) => response.data.result)
    .catch((error) => {
      console.error("Error fetching articles:", error);
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

export const deleteComment = (comment_id, username) => {
  return axios
    .delete(`${main_url}/comments/${comment_id}`, {
      data: { username },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting comment", error);
      throw error;
    });
};

export const getTopics = () => {
  return axios
    .get(`${main_url}/topics`)
    .then((response) => response.data.topics)
    .catch((error) => {
      console.error("Error fetching topics", error);
      throw error;
    });
};

export const getArticlesByTopic = (topic) => {
  return axios
    .get(`${main_url}/articles?topic=${topic}`)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      console.error("Error fetching articles by topic", error);
      throw error;
    });
};
