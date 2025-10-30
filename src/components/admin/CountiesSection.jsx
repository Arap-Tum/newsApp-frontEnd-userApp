import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthConttext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCounty, updateCounty, deleteCounty } from "../../api/counties";
import "../../styles/CountiesSection.css";

export const CountiesSection = ({ counties = [] }) => {
  const [form, setFormData] = useState({ name: "", region: "" });
  const [editingCounty, setEditingCounty] = useState(null); // track the county being edited
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // ─── CREATE ───────────────────────────────
  const createCountyMutation = useMutation({
    mutationFn: async (county) => await createCounty(county, token),
    onSuccess: (data) => {
      toast.success("County created successfully!");
      setFormData({ name: "", region: "" });
      queryClient.invalidateQueries(["counties"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error creating county.");
      console.error("❌ Error creating county:", error);
    },
  });

  // ─── UPDATE ───────────────────────────────
  const updateCountyMutation = useMutation({
    mutationFn: async ({ id, data }) => await updateCounty(id, data, token),
    onSuccess: (data) => {
      toast.success("County updated successfully!");
      setEditingCounty(null);
      setFormData({ name: "", region: "" });
      queryClient.invalidateQueries(["counties"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error updating county.");
      console.error("❌ Error updating county:", error);
    },
  });

  // ─── DELETE ───────────────────────────────
  const deleteCountyMutation = useMutation({
    mutationFn: async (id) => await deleteCounty(id, token),
    onSuccess: (data) => {
      toast.success("County deleted successfully!");
      queryClient.invalidateQueries(["counties"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error deleting county.");
      console.error("❌ Error deleting county:", error);
    },
  });

  // ─── HANDLERS ─────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("County name cannot be empty.");
      return;
    }

    if (editingCounty) {
      // update mode
      updateCountyMutation.mutate({
        id: editingCounty.id,
        data: { name: form.name, region: form.region },
      });
    } else {
      // create mode
      createCountyMutation.mutate({ name: form.name, region: form.region });
    }
  };

  const handleEdit = (county) => {
    setEditingCounty(county);
    setFormData({ name: county.name, region: county.region || "" });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCountyMutation.mutate(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingCounty(null);
    setFormData({ name: "", region: "" });
  };

  // ─── RENDER ─────────────────────────────
  return (
    <div className="counties-section">
      {/* ─── Header ─────────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">Counties</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <input
            style={{ margin: 10, padding: 6, borderRadius: 10 }}
            name="name"
            placeholder={
              editingCounty ? "Edit county name..." : "Add new county"
            }
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          <input
            style={{ margin: 10, padding: 6, borderRadius: 10 }}
            name="region"
            placeholder={editingCounty ? "Edit region..." : "Region (optional)"}
            type="text"
            value={form.region}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`add-county-btn ${
              editingCounty ? "update-btn" : "create-btn"
            }`}
          >
            {editingCounty ? "✅ Update County" : "+ Add County"}
          </button>
          {editingCounty && (
            <button
              type="button"
              className="cancel-edit-btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* ─── Table ─────────────────────────────── */}
      <div className="table-container">
        <table className="counties-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">#</th>
              <th className="table-header">Name</th>
              <th className="table-header">Region</th>
              <th className="table-header">Articles Count</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {counties.length > 0 ? (
              counties.map((county, index) => (
                <tr className="table-row" key={county.id}>
                  <td className="table-cell index-cell">{index + 1}</td>
                  <td className="table-cell name-cell">
                    <span className="county-name">{county.name}</span>
                  </td>
                  <td className="table-cell region-cell">
                    {county.region || "—"}
                  </td>
                  <td className="table-cell count-cell">
                    {county.articlesCount ?? 0}
                  </td>
                  <td className="table-cell actions-cell">
                    <div className="actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(county)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(county.id, county.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="table-row empty-row">
                <td colSpan="5" className="empty-message">
                  No counties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
