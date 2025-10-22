import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UsersSection.css";
export const UsersSection = ({ users = [], onRoleChange, onDelete }) => {
  return (
    <div className="users-section">
      {/* ─── Section Header ───────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">User Management</h2>
        <p className="section-subtitle">
          Manage all users, assign roles, or remove inactive accounts.
        </p>
      </div>

      {/* ─── Users Table ─────────────────────────────── */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="col-username">Name</th>
              <th className="col-email">Email</th>
              <th className="col-role">Role</th>
              <th className="col-date">Joined</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="user-row">
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>

                  {/* ─── Role dropdown (only editable by Admins) */}
                  <td className="user-role">
                    {user.role === "ADMIN" ? (
                      <span className="role-badge admin-role">{user.role}</span>
                    ) : (
                      <select
                        className="role-select"
                        value={user.role}
                        onChange={(e) =>
                          onRoleChange && onRoleChange(user.id, e.target.value)
                        }
                      >
                        <option value="USER">User</option>
                        <option value="AUTHOR">Author</option>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    )}
                  </td>

                  {/* ─── Join Date */}
                  <td className="user-date">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* ─── Actions */}
                  <td className="user-actions">
                    <div className="action-buttons">
                      {/* View profile */}
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="view-link"
                      >
                        View
                      </Link>

                      {/* Delete user (disabled for Admins) */}
                      <button
                        className="delete-btn"
                        disabled={user.role === "ADMIN"}
                        onClick={() =>
                          user.role !== "ADMIN" && onDelete && onDelete(user.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
