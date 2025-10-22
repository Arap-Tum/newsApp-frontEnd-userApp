import React, { useState, useEffect } from "react";
import "../../styles/form.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createArticle } from "../../api/articles";
import { useArticleCategories } from "../../hooks/useCattegoriesService";
import { useArticleCounties } from "../../hooks/useCounties";
import { useAuth } from "../../context/AuthConttext";

export const CreateArticle = () => {
  const { token } = useAuth();

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

  const { data: allCategories = [] } = useArticleCategories();
  const { data: allCounties = [] } = useArticleCounties();

  // Automatically set category and county lists
  const [categories, setCategories] = useState([]);
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    if (allCategories) setCategories(allCategories);
    if (allCounties) setCounties(allCounties);
  }, [allCategories, allCounties]);

  const createArticleMutation = useMutation({
    mutationFn: async (article) => await createArticle(article, token),
    onSuccess: (data) => {
      toast.success("✅ Article created successfully!");
      console.log("Article created:", data);
      resetForm();
    },
    onError: (error) => {
      const message =
        error?.message || "Something went wrong while creating the article.";
      toast.error(message);
      console.error("❌ Error creating article:", error);
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

    createArticleMutation.mutate(data);
  };

  const resetForm = () => {
    setFormData({
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
    setPreview(null);
  };

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
          id="title"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        {/* Mini Editor */}
        <div className="mini-editor">
          {/* Toolbar (bold, italic, etc.) */}
          <div className="editor-toolbar"></div>

          {/* Textarea */}
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article content.."
            required
          />
        </div>

        {/* Mini Editor */}
        <div className="mini-editor">
          {/* Toolbar (bold, italic, etc.) */}
          <div className="editor-toolbar"></div>

          {/* Textarea */}
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short summary (excerpt)"
            required
          />
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit}>Publish</button>
      </div>

      {/* RIGHT PANEL - Sidebar Options */}
      <div className="sidebar-panel">
        {/* Category */}
        <div className="sidebar-section">
          <label>Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>County</label>
          <select
            id="countyId"
            name="countyId"
            value={formData.county}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {counties.map((county) => (
              <option key={county.id} value={county.id}>
                {county.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <label htmlFor="imageUrl">Upload Image </label>
          <input
            type="file"
            id="imageUrl"
            name="image"
            onChange={handleChange}
          />

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

        {/* Trending */}
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

        {/* Featured */}
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
