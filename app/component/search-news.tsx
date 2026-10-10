import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getNews } from "../lib/utils";
import { useNewsStore } from "../news/store/newsStore";

export default function SearchNews() {
    const [search, setSearch] = useState("");
    const [isDebounce, setIsDebounce] = useState("");
    const caseSensi = isDebounce.trim().toLowerCase();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDebounce(search);
            searchNews(search);
        }, 300);
        console.log(isDebounce);

        return () => clearTimeout(timer);
    }, [search]);

    const { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ["news", caseSensi],
        queryFn: () => getNews(caseSensi),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });

    const searchNews = useNewsStore((state) => state.fetchSearchNews);

    return (
        <div className="w-full max-w-md">
            <div className="flex items-center gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search news..."
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                    onClick={() => setIsDebounce(search)}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                >
                    Search
                </button>
            </div>
            {isDebounce && (
                <p className="text-xs text-muted-foreground mt-1.5 px-1 truncate">
                    Active query: <span className="font-semibold text-foreground">{isDebounce}</span>
                </p>
            )}
        </div>
    );
}