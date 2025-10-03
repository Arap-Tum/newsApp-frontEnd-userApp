import { API_URI } from "./localApi";

export async function register(credential) {
  try {
    const response = await fetch(`${API_URI}/auth/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/Json",
      },
      body: JSON.stringify(credential),
    });

    // Try parsing response (might fail if it's HTML error page)
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid response. Please try again later."
      );
    }

    // If not ok, throw backend message if present
    if (!response.ok) {
      console.error("Backend error: ", data);
      throw new Error(data?.error || data?.message || "Register failed");
    }

    return data;
  } catch (error) {
    console.error("Error in user Registerin:", error);
    // Preserve backend error messages if they exist
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function login(credential) {
  try {
    const response = await fetch(`${API_URI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    // Try parsing response (might fail if it's HTML error page)
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Server returned an invalid response. Please try again later."
      );
    }

    // If not ok, throw backend message if present
    if (!response.ok) {
      console.error("Backend error: ", data);
      throw new Error(data?.error || data?.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Error in Login:", error);

    // Preserve backend error messages if they exist
    if (error instanceof Error && error.message) {
      throw error; // rethrow with backend's message
    }

    // Otherwise, fallback to generic
    throw new Error("Something went wrong. Please try again later.");
  }
}
