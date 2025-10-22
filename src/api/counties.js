import { API_URI } from "./localApi";

// FETCH PRODUCT counties
export async function fetchArticleCounty() {
  console.log(`${API_URI}counties`);
  try {
    const response = await fetch(`${API_URI}/counties`);

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid resnse . PLease try agin leater."
      );
    }

    // console.log("counties data", data);

    if (!response.ok) {
      console.log("Error fetching counties", data);
      throw new Error(
        data?.error || data?.message || "Fetchin counties failed "
      );
    }
    return data;
  } catch (error) {
    console.log("Error fetching counties ", error);
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}

// create
export async function createCounty(county, token) {
  console.log(`${API_URI}/counties`);
  try {
    const response = await fetch(`${API_URI}/counties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(county),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid resnse . PLease try agin leater."
      );
    }

    // console.log("counties data", data);

    if (!response.ok) {
      console.log("Error fetching counties", data);
      throw new Error(
        data?.error || data?.message || "Fetchin counties failed "
      );
    }

    return data;
  } catch (error) {
    console.log("Error fetching counties ", error);
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}
