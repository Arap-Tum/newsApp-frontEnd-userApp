import { useQuery } from "@tanstack/react-query";
import { fetchArticleCategory } from "../api/categoriesAPI";

export function useArticleCategories() {
  const allCattegories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchArticleCategory,
  });

  return allCattegories;
}
