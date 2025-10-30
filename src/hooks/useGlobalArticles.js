import { useQuery } from "@tanstack/react-query";
import { getGlobalNews } from "../api/externallNews";

export function useGlobalArticles() {
  return useQuery({
    queryKey: ["globalNews"],
    queryFn: getGlobalNews,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice if it fails
  });
}
