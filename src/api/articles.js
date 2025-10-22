import { API_URI } from "./localApi";
import axios from "./api";

// CRUD
export const getArticles = () => axios.get("/articles");

/// ========================
// 🔹 Shared Helpers
// ========================
const handleApiResponse = async (response, defaultErrorMessage) => {
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Server returned an invalid response. Please try again later."
    );
  }

  if (!response.ok) {
    console.error("Backend error:", data);
    throw new Error(data?.error || data?.message || defaultErrorMessage);
  }

  return data;
};

const handleApiError = (error, fallbackMessage) => {
  console.error(fallbackMessage, error);
  if (error instanceof Error && error.message) throw error;
  throw new Error(fallbackMessage);
};

// ========================
// 🔹 CREATE ARTICLE
// ========================
export async function createArticle(formData, token) {
  try {
    const response = await fetch(`${API_URI}/articles`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return await handleApiResponse(response, "Article creation failed");
  } catch (error) {
    handleApiError(error, "Error creating article.");
  }
}

// ========================
// 🔹 EDIT ARTICLE
// ========================
export async function editArticle(id, formData, token) {
  try {
    const response = await fetch(`${API_URI}/articles/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return await handleApiResponse(response, "Article update failed");
  } catch (error) {
    handleApiError(error, "Error editing article.");
  }
}

// ========================
// 🔹 DELETE ARTICLE
// ========================
export async function deleteArticleApi(id, token) {
  try {
    const response = await fetch(`${API_URI}/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleApiResponse(response, "Article deletion failed");
  } catch (error) {
    handleApiError(error, "Error deleting article.");
  }
}

// ========================
// 🔹 FETCH ALL ARTICLES
// ========================
export async function fetchArticles(token) {
  try {
    const response = await fetch(`${API_URI}/articles`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleApiResponse(response, "Failed to fetch articles");
  } catch (error) {
    handleApiError(error, "Error fetching articles.");
  }
}

// ========================
// 🔹 FETCH SINGLE ARTICLE BY ID
// ========================
export async function fetchArticleById(id, token) {
  try {
    const response = await fetch(`${API_URI}/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleApiResponse(response, "Failed to fetch article details");
  } catch (error) {
    handleApiError(error, "Error fetching article details.");
  }
}
