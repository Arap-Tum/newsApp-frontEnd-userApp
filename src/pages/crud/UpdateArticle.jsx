import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useArticle } from "../../hooks/useArticleService";
import { useArticleCategories } from "../../hooks/useCattegoriesService";
import { useArticleCounties } from "../../hooks/useCounties";
import { editArticle } from "../../api/articles";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthConttext";
// ✅ your update API function

export const UpdateArticle = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const { data: article, isLoading } = useArticle(id);
  const { data: allCategories = [] } = useArticleCategories();
  const { data: allCounties = [] } = useArticleCounties();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    excerpt: "",
    categoryId: "",
    countyId: "",
    image: null,
    isTrending: false,
    isFeatured: false,
  });

  const [preview, setPreview] = useState(null);

  // Prefill data when article loads
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        subtitle: article.subtitle || "",
        content: article.content || "",
        excerpt: article.excerpt || "",
        categoryId: article.categoryId || "",
        countyId: article.countyId || "",
        image: null, // user can reupload if they want
        isTrending: article.isTrending || false,
        isFeatured: article.isFeatured || false,
      });

      // show preview of existing image if available
      if (article.imageUrl) setPreview(article.imageUrl);
    }
  }, [article]);

  const updateArticleMutation = useMutation({
    mutationFn: async (data) => await editArticle(id, data, token),
    onSuccess: (data) => {
      toast.success("✅ Article updated successfully!");
      console.log("Article updated:", data);
    },
    onError: (error) => {
      const message =
        error?.message || "Something went wrong while updating the article.";
      toast.error(message);
      console.error("❌ Error updating article:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) data.append(key, value);
    });

    updateArticleMutation.mutate(data);
  };

  if (isLoading) return <p>Loading article...</p>;

  return (
    <div className="article-form">
      {/* LEFT PANEL - Editor */}
      <div className="editor-panel">
        {/* Title */}
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        {/* Content */}
        <div className="mini-editor">
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article content..."
            required
          />
        </div>

        {/* Excerpt */}
        <div className="mini-editor">
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short summary (excerpt)"
            required
          />
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}>
          {updateArticleMutation.isPending ? "Updating..." : "Update Article"}
        </button>
      </div>

      {/* RIGHT PANEL - Sidebar Options */}
      <div className="sidebar-panel">
        <div className="sidebar-section">
          <label>Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>County</label>
          <select
            id="countyId"
            name="countyId"
            value={formData.countyId}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {allCounties.map((county) => (
              <option key={county.id} value={county.id}>
                {county.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="sidebar-section">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" onChange={handleChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
        </div>

        {/* Checkboxes */}
        <div className="sidebar-section">
          <label>
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
            />{" "}
            Trending
          </label>
        </div>

        <div className="sidebar-section">
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />{" "}
            Featured
          </label>
        </div>
      </div>
    </div>
  );
};
