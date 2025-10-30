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

// update
export async function updateCounty(countyId, updatedCounty, token) {
  console.log(`${API_URI}/counties/${countyId}`);
  try {
    const response = await fetch(`${API_URI}/counties/${countyId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCounty),
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
      console.log("Error updating county:", data);
      throw new Error(
        data?.error || data?.message || "Updating county failed."
      );
    }

    return data;
  } catch (error) {
    console.error("Error updating county:", error);
    if (error instanceof Error && error.message) throw error;
    throw new Error("Something went wrong. Please try again later.");
  }
}

// delete
export async function deleteCounty(countyId, token) {
  console.log(`${API_URI}/counties/${countyId}`);
  try {
    const response = await fetch(`${API_URI}/counties/${countyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      // Some APIs return no body for DELETE requests
      data = { message: "County deleted successfully" };
    }

    if (!response.ok) {
      console.log("Error deleting county:", data);
      throw new Error(
        data?.error || data?.message || "Deleting county failed."
      );
    }

    return data;
  } catch (error) {
    console.error("Error deleting county:", error);
    if (error instanceof Error && error.message) throw error;
    throw new Error("Something went wrong. Please try again later.");
  }
}
