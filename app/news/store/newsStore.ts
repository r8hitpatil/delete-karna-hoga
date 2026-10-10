import { create } from 'zustand';
import { getNews } from '../../lib/utils';

type News = {
    title : string;
    description : string;
}

type NewsStore = {
    searchNews : News[];

    fetchSearchNews : (searchInput:string) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
    searchNews : [],

    fetchSearchNews: async (inp) => {
        const data = await getNews(inp);
        const response = data.articles;
        set({
            searchNews: response
        })
    },
}));