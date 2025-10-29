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

  return data || [];
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
// 🔹 FETCH MY ARTICLES
// ========================

export async function getMyArticles(token) {
  try {
    const response = await fetch(`${API_URI}/articles/my-articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleApiResponse(response, "Failed to fetch My Articles");
  } catch (error) {
    handleApiError(error, "Error fetching My  articles.");
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

// ========================
// 🔹 verigy SINGLE ARTICLE BY ID
// ========================

// api/articles.js
export async function verifyArticle(id, verificationStatus, token) {
  try {
    const res = await fetch(`${API_URI}/articles/verify/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ verificationStatus }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to verify article");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Verify Article Error:", err);
    throw err;
  }
}


export async function fetchVerifiedArticles() {
  try {
    console.log("📡 Fetching verified articles...");
    const response = await fetch(`${API_URI}/articles/verified`);
    console.log("🔍 Raw response:", response);

    const data = await handleApiResponse(response, "Failed to fetch articles");

    console.log("✅ Verified articles fetched successfully:", data);

    return data || [];
  } catch (error) {
    try {
      handleApiError(error, "Error fetching articles.");
    } catch (err) {
      console.error("💥 Final caught error:", err);
    }
    return []; // ✅ This now executes even when handleApiError rethrows
  }
}