import { useQuery } from "@tanstack/react-query";
import {
  fetchArticleById,
  fetchArticles,
  getMyArticles,
} from "../api/articles";
import { fetchVerifiedArticles } from "../api/publicArticles";

export function useVerifiedArticles() {
  return useQuery({
    queryKey: ["verifiedArticles"],
    queryFn: fetchVerifiedArticles,
    onSuccess: (data) => {
      console.log("🎉 Hook received verified articles:", data);
    },
    onError: (error) => {
      console.error("💥 Hook error fetching verified articles:", error);
    },
  });
}
export function useAllTheAricles(token) {
  return useQuery({
    queryKey: [" articles"],
    queryFn: () => fetchArticles(token),
  });
}

export function useArticle(articleId) {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleById(articleId),
    enabled: !!articleId,
  });
}

export function useMyArticles(token) {
  return useQuery({
    queryKey: ["myArticle"],
    queryFn: () => getMyArticles(token),
  });
}
