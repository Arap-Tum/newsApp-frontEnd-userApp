import { API_URI } from "./localApi";

// ✅ Helper function for cleaner fetch calls
async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error || data?.message || "An unknown error occurred";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", error.message);
    throw error;
  }
}

/**
 * 🔹 Get all users (Admin only)
 */
export async function getAllUsers(token) {
  return request(`${API_URI}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * 🔹 Get user by ID (Admin or public for profile viewing)
 */
export async function getUserById(id, token) {
  return request(`${API_URI}/users/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/**
 * 🔹 Update own profile (User, Author, Editor, Admin)
 */
export async function updateMyProfile(token, payload) {
  return request(`${API_URI}/users/self`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

/**
 * 🔹 Admin: Update user role (USER → AUTHOR / EDITOR / ADMIN)
 */
export async function updateUserRole(id, role, token) {
  return request(`${API_URI}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
}

/**
 * 🔹 Admin: Update user info (name/email/password)
 */
export async function updateUser(id, payload, token) {
  return request(`${API_URI}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

/**
 * 🔹 Admin: Delete user
 * Optionally transfer their articles to another user
 */
export async function deleteUser(id, token, transferId = null) {
  return request(`${API_URI}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: transferId ? JSON.stringify({ transferId }) : null,
  });
}
