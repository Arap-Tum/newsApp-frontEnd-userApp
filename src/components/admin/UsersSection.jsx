import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/UsersSection.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthConttext";
import { toast } from "react-toastify";
import { deleteUser, updateUserRole } from "../../api/users";
export const UsersSection = ({ users = [] }) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Local UI state for the "transfer on delete" workflow
  const [deleteTargetId, setDeleteTargetId] = useState(null); // user id we want to delete
  const [transferToId, setTransferToId] = useState(null); // selected transfer recipient
  const [showTransferConfirm, setShowTransferConfirm] = useState(false);

  // ─── Role change mutation ─────────────────────────
  const roleChangeMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role, token),
    onSuccess: (_, variables) => {
      toast.success(
        `Role changed to ${variables.role.toLowerCase()} successfully`
      );
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(`❌ Failed to change role: ${error.message}`);
    },
  });

  // ─── Delete user mutation (requires transferId) ───
  const deleteUserMutation = useMutation({
    mutationFn: ({ id, transferId }) => deleteUser(id, token, transferId),
    onSuccess: () => {
      toast.success("User deleted and articles transferred successfully");
      // Refresh users and articles lists
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["articles"]);
      // reset modal state
      setShowTransferConfirm(false);
      setDeleteTargetId(null);
      setTransferToId(null);
    },
    onError: (error) => {
      toast.error(`❌ Failed to delete user: ${error.message}`);
    },
  });

  // ─── Handlers ────────────────────────────────────
  const handleRoleChange = (id, role) => {
    roleChangeMutation.mutate({ id, role });
  };

  // When admin clicks the delete button: open the transfer modal
  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setTransferToId(null);
    setShowTransferConfirm(true);
  };

  // Confirm delete: require transferToId
  const confirmDelete = () => {
    if (!deleteTargetId) return;
    if (!transferToId) {
      toast.error(
        "Please select a user to transfer articles to before deleting."
      );
      return;
    }
    deleteUserMutation.mutate({ id: deleteTargetId, transferId: transferToId });
  };

  const cancelDelete = () => {
    setShowTransferConfirm(false);
    setDeleteTargetId(null);
    setTransferToId(null);
  };

  // possible transfer recipients: all users except the one being deleted
  const transferRecipients = useMemo(() => {
    if (!users || users.length === 0) return [];
    return users.filter((u) => u.id !== deleteTargetId);
  }, [users, deleteTargetId]);

  // utility: pretty date
  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  return (
    <section className="users-section">
      <header className="section-header">
        <h2 className="section-title">User Management</h2>
        <p className="section-subtitle">
          Manage users, assign roles, and transfer articles when removing an
          account.
        </p>
      </header>

      <div className="table-container">
        <table className="data-table" role="table" aria-label="Users table">
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

                  <td className="user-role">
                    {user.role === "ADMIN" ? (
                      <span className="role-badge admin-role" aria-hidden>
                        {user.role}
                      </span>
                    ) : (
                      <select
                        className="role-select"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        disabled={roleChangeMutation.isPending}
                        aria-label={`Change role for ${user.name}`}
                      >
                        <option value="USER">User</option>
                        <option value="AUTHOR">Author</option>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    )}
                  </td>

                  <td className="user-date">{formatDate(user.createdAt)}</td>

                  <td className="user-actions">
                    <div
                      className="action-buttons"
                      role="group"
                      aria-label={`Actions for ${user.name}`}
                    >
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="view-link"
                      >
                        View
                      </Link>

                      <button
                        className="delete-btn"
                        disabled={
                          user.role === "ADMIN" || deleteUserMutation.isPending
                        }
                        onClick={() => handleDeleteClick(user.id)}
                        aria-disabled={
                          user.role === "ADMIN" || deleteUserMutation.isPending
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

      {/* ─── Transfer confirmation modal (simple inline dialog) ───────────────── */}
      {showTransferConfirm && (
        <div
          className="transfer-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="transfer-modal-title"
        >
          <div className="transfer-modal-inner">
            <h3 id="transfer-modal-title">Transfer articles before deleting</h3>
            <p>
              You are about to delete a user. All their articles must be
              transferred to another user. Select the recipient below to
              proceed.
            </p>

            {transferRecipients.length === 0 ? (
              <div className="no-recipients">
                <p>
                  There are no other users available to receive articles. Create
                  or invite another user before deleting this account.
                </p>
                <div className="modal-actions">
                  <button onClick={cancelDelete} className="btn secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="transfer-form">
                <label htmlFor="transfer-to" className="sr-only">
                  Transfer articles to
                </label>

                <select
                  id="transfer-to"
                  value={transferToId || ""}
                  onChange={(e) => setTransferToId(e.target.value)}
                >
                  <option value="" disabled>
                    — Select recipient —
                  </option>
                  {transferRecipients.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.email} {r.role ? `(${r.role})` : ""}
                    </option>
                  ))}
                </select>

                <div className="modal-actions">
                  <button
                    className="btn danger"
                    onClick={confirmDelete}
                    disabled={!transferToId || deleteUserMutation.isPending}
                  >
                    {deleteUserMutation.isPending
                      ? "Deleting…"
                      : "Confirm Delete & Transfer"}
                  </button>

                  <button
                    className="btn secondary"
                    onClick={cancelDelete}
                    disabled={deleteUserMutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
