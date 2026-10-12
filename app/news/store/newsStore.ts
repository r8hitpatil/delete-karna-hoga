import { create } from 'zustand';

type News = {
    id: string;
    title: string;
    description: string;
    publishedAt: Date;
}

type NewsStore = {
    searchNews: News[];
    fetchSearchNews: (searchInput?: string) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
    searchNews: [],

    fetchSearchNews: async (inp = "") => {
        try {
            const query = inp.trim();
            const url = query ? `/api/news?q=${encodeURIComponent(query)}` : `/api/news`;
            const res = await fetch(url);
            const json = await res.json();
            set({
                searchNews: json.data || [],
            });
        } catch (error) {
            console.error("Error in fetchSearchNews:", error);
            set({ searchNews: [] });
        }
    },
}));