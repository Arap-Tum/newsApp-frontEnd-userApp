import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/CountiesSection.css";
import { useAuth } from "../../context/AuthConttext";
import { useMutation } from "@tanstack/react-query";
import { createCounty } from "../../api/counties";
import { toast } from "react-toastify";
export const CountiesSection = ({ counties = [] }) => {
  const [form, setFormData] = useState({ name: "", region: "" });
  const { token } = useAuth();

  const createcounty = useMutation({
    mutationFn: async (county) => {
      return await createCounty(county, token);
    },
    onSuccess: (data) => {
      console.log("county created : ", data);
      toast.success(`county created `);
    },
    onError: (error) => {
      const message =
        error?.message || "Something went wrong while creating the article";
      toast.error(message);
      console.error("❌ Error creating county:", error);
    },
  });
  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createcounty.mutate({ name: form.name, region: form.region });
  };

  return (
    <div className="counties-section">
      {/* ─── Header ─────────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">Counties</h2>
        <div style={{ display: "flex" }}>
          <input
            style={{ margin: 10, padding: 6, borderRadius: 10 }}
            name="name"
            placeholder="add new county"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          <input
            style={{ margin: 10, padding: 6, borderRadius: 10 }}
            name="region"
            placeholder="region "
            type="text"
            value={form.region}
            onChange={handleChange}
          />
        </div>
        {/* <Link to="/admin/counties/new" className="add-county-link"> */}
        <button className="add-county-btn" onClick={handleSubmit}>
          + Add County
        </button>
        {/* </Link> */}
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
                  {/* ─── Index ───────────────────────────── */}
                  <td className="table-cell index-cell">{index + 1}</td>

                  {/* ─── Name ───────────────────────────── */}
                  <td className="table-cell name-cell">
                    <span className="county-name">{county.name}</span>
                  </td>

                  {/* ─── Region ─────────────────────────── */}
                  <td className="table-cell region-cell">
                    {county.region || "—"}
                  </td>

                  {/* ─── Articles Count ─────────────────── */}
                  <td className="table-cell count-cell">
                    {county.articlesCount ?? 0}
                  </td>

                  {/* ─── Actions ────────────────────────── */}
                  <td className="table-cell actions-cell">
                    <div className="actions">
                      {/* <Link
                        to={`/admin/counties/${county.id}`}
                        className="action-btn view-btn"
                      >
                        View
                      </Link> */}
                      <Link
                        to={`/admin/counties/edit/${county.id}`}
                        className="action-btn edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="action-btn delete-btn"
                        onClick={() =>
                          window.confirm(
                            `Are you sure you want to delete "${county.name}"?`
                          ) && console.log("Delete", county.id)
                        }
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
