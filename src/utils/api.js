import axios from "axios";

const main_url = "https://nc-project-news.onrender.com/api";

export const getArticles = ({
  sortBy = "created_at",
  order = "desc",
  page = 1,
  limit = 5,
} = {}) => {
  return axios
    .get(`${main_url}/articles`, {
      params: {
        sort_by: sortBy,
        order: order,
        page: page,
        limit: limit,
      },
    })
    .then((response) => {
      if (!response.data.result || !response.data.total_count) {
        throw new Error("Invalid response format from the server");
      }
      return response.data;
    })
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

export const getArticlesByTopic = (topic, { sort_by, order, page, limit }) => {
  return axios
    .get(`${main_url}/articles`, {
      params: {
        topic: topic,
        sort_by: sort_by,
        order: order,
        page: page,
        limit: limit,
      },
    })
    .then((response) => {
      return {
        articles: response.data.result,
        total_count: response.data.total_count,
      };
    })
    .catch((error) => {
      console.error("Error fetching articles by topic", error);
      throw error;
    });
};
export const voteOnComment = (id, incVotes) => {
  return axios
    .patch(`${main_url}/comments/${id}`, { inc_votes: incVotes })
    .then(({ data }) => data.comment)
    .catch((error) => {
      console.error("Error voting on comment", err);
      throw error;
    });
};

export const getUsers = () => {
  return axios
    .get(`${main_url}/users`)
    .then((response) => response.data.users)
    .catch((error) => {
      console.error("Error fetching users", error);
      throw error;
    });
};

export const postArticle = (author, title, body, topic, article_img_url) => {
  return axios
    .post(`${main_url}/articles`, {
      author,
      title,
      body,
      topic,
      article_img_url,
    })
    .then((response) => response.data.article)
    .catch((error) => {
      throw error;
    });
};

export const deleteArticle = (id) => {
  return axios.delete(`${main_url}/articles/${id}`).catch(() => {
    throw new Error("Could not delete the article.");
  });
};
