import { API_URI } from "./localApi";

export async function fetchVerifiedArticles() {
  console.log(`${API_URI}/articles/verified`);

  try {
    const response = await fetch(`${API_URI}/articles/verified`);
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid resnse . PLease try agin leater."
      );
    }

    if (!response.ok) {
      console.log("Error fetching verified articles", data);
      throw new Error(
        data?.error || data?.message || "Fetchin articles failed "
      );
    }

    console.log("✅ Verified articles fetched successfully:", data);

    return data;
  } catch (error) {
    console.log("Error fetching articles ", error);
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}
