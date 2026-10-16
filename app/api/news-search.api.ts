"use client";

import { useQuery } from "@tanstack/react-query";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string | Date;
}

export async function fetchSearchNews(searchInput: string = ""): Promise<NewsItem[]> {
  try {
    const query = searchInput.trim();
    const url = query ? `/api/news?q=${encodeURIComponent(query)}` : `/api/news`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error in fetchSearchNews:", error);
    return [];
  }
}

export function useNewsSearch(searchInput: string = "") {
  return useQuery<NewsItem[]>({
    queryKey: ["news-search", searchInput],
    queryFn: () => fetchSearchNews(searchInput),
    staleTime: 60 * 1000,
  });
}
