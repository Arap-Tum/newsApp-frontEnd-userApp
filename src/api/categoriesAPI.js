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
