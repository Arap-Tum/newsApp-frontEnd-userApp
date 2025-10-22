import { useQuery } from "@tanstack/react-query";
import { fetchArticleCounty } from "../api/counties";

export function useArticleCounties() {
  const allCounties = useQuery({
    queryKey: ["counties"],
    queryFn: fetchArticleCounty,
  });

  return allCounties;
}
