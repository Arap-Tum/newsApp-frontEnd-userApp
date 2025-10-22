import React from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticleService";
import { format } from "date-fns";

export const ArticleDetail = () => {
  const { slug } = useParams(); // e.g. /articles/:slug
  const { data: article, isLoading, error } = useArticle(slug);

  if (isLoading)
    return (
      <p className="text-gray-500 text-center mt-10">Loading article...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load article.</p>
    );
  if (!article)
    return (
      <p className="text-gray-500 text-center mt-10">Article not found.</p>
    );

  const {
    title,
    subtitle,
    content,
    excerpt,
    imageUrl,
    author,
    category,
    county,
    createdAt,
    isTrending,
    isFeatured,
    verificationStatus,
  } = article;

  return (
    <div className="article-detail-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Hero Image */}
      {imageUrl && (
        <div className="w-full h-80 rounded-xl overflow-hidden mb-6">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <h2 className="text-lg text-gray-600 mt-1">{subtitle}</h2>}
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span>🧑‍💼 {author?.name || "Unknown Author"}</span>
        {category && <span>📚 {category.name}</span>}
        {county && <span>📍 {county.name}</span>}
        <span>🕒 {format(new Date(createdAt), "PPP")}</span>

        {isTrending && (
          <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
            🔥 Trending
          </span>
        )}
        {isFeatured && (
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            ⭐ Featured
          </span>
        )}
        {verificationStatus && (
          <span
            className={`px-2 py-1 rounded-full ${
              verificationStatus === "APPROVED"
                ? "bg-green-100 text-green-600"
                : verificationStatus === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {verificationStatus}
          </span>
        )}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="mb-6 border-l-4 border-gray-300 pl-4 italic text-gray-700">
          {excerpt}
        </div>
      )}

      {/* Content */}
      <div
        className="article-content prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};
