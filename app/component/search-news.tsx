'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useNewsStore } from "../news/store/newsStore";

function SearchNewsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeQuery = searchParams.get("q") || "";
    const [search, setSearch] = useState(activeQuery);
    const fetchSearchNews = useNewsStore((state) => state.fetchSearchNews);

    // Sync input field if user navigates via browser back/forward
    useEffect(() => {
        setSearch(activeQuery);
    }, [activeQuery]);

    // Function to update the URL query parameters in the address bar
    const applySearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const trimmed = query.trim();

        if (trimmed) {
            params.set("q", trimmed);
        } else {
            params.delete("q");
        }
        params.delete("page"); // Reset pagination when search changes

        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.push(newUrl);

        // Keep Zustand store in sync for components that subscribe to it (e.g. Dashboard)
        fetchSearchNews(trimmed);
    };

    // Debounce search input as user types
    useEffect(() => {
        if (search.trim() === activeQuery.trim()) return;

        const timer = setTimeout(() => {
            applySearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applySearch(search);
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search news..."
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                >
                    Search
                </button>
            </form>
            {activeQuery && (
                <p className="text-xs text-muted-foreground mt-1.5 px-1 truncate">
                    Active query: <span className="font-semibold text-foreground">{activeQuery}</span>
                </p>
            )}
        </div>
    );
}

export default function SearchNews() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-md">
                <div className="flex items-center gap-2">
                    <input
                        placeholder="Search news..."
                        disabled
                        className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 opacity-60"
                    />
                    <button
                        disabled
                        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm opacity-60"
                    >
                        Search
                    </button>
                </div>
            </div>
        }>
            <SearchNewsContent />
        </Suspense>
    );
}