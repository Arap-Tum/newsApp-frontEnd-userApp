import { API_URI } from "./localApi";

// FETCH PRODUCT CATEGORIES
export async function fetchArticleCategory() {
  console.log(`${API_URI}categories`);
  try {
    const response = await fetch(`${API_URI}/categories`);

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid resnse . PLease try agin leater."
      );
    }

    // console.log("categories data", data);

    if (!response.ok) {
      console.log("Error fetching Categories", data);
      throw new Error(
        data?.error || data?.message || "Fetchin categories failed "
      );
    }
    return data;
  } catch (error) {
    console.log("Error fetching categories ", error);
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}

// create
export async function createArticleCategory(category, token) {
  console.log(`${API_URI}/categories`);
  try {
    const response = await fetch(`${API_URI}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid resnse . PLease try agin leater."
      );
    }

    // console.log("categories data", data);

    if (!response.ok) {
      console.log("Error fetching Categories", data);
      throw new Error(
        data?.error || data?.message || "Fetchin categories failed "
      );
    }

    return data;
  } catch (error) {
    console.log("Error fetching categories ", error);
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}

// update
export async function updateArticleCategory(
  categoryId,
  updatedCategory,
  token
) {
  console.log(`${API_URI}/categories/${categoryId}`);
  try {
    const response = await fetch(`${API_URI}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid response. Please try again later."
      );
    }

    if (!response.ok) {
      console.log("Error updating category:", data);
      throw new Error(
        data?.error || data?.message || "Updating category failed."
      );
    }

    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    if (error instanceof Error && error.message) throw error;
    throw new Error("Something went wrong. Please try again later.");
  }
}

// delete
export async function deleteArticleCategory(categoryId, token) {
  console.log(`${API_URI}/categories/${categoryId}`);
  try {
    const response = await fetch(`${API_URI}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      // Some APIs return no body on DELETE
      data = { message: "Category deleted successfully" };
    }

    if (!response.ok) {
      console.log("Error deleting category:", data);
      throw new Error(
        data?.error || data?.message || "Deleting category failed."
      );
    }

    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    if (error instanceof Error && error.message) throw error;
    throw new Error("Something went wrong. Please try again later.");
  }
}
