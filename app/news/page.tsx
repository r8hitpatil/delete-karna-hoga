'use client';

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/toast";
import SearchNews from "../component/search-news";
import { getCurrentUser } from "../api/auth/lib/session";
import { logout } from "../api/auth/action";

type NewsItem = {
    id: string;
    title: string;
    description: string;
    publishedAt: string | Date;
};

function NewsFeedContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read state from URL query parameters (single source of truth in the address bar)
    const q = searchParams.get("q") || "";
    const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    const paginate = 5;
    const [showButton, setShowButton] = useState(false);

    // Fetch news with standard HTTP GET /api/news?q=...&sort=...
    const { data: news = [], isLoading } = useQuery<NewsItem[]>({
        queryKey: ["news", q, sort],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (sort) params.set("sort", sort);
            const res = await fetch(`/api/news?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch news");
            const json = await res.json();
            return json.data || [];
        },
        staleTime: 60 * 1000,
    });

    // Check user auth status
    useEffect(() => {
        async function readCookie() {
            const res = await getCurrentUser();
            setShowButton(Boolean(res));
        }
        readCookie();
    }, []);

    // Toggle sort order and reflect it in the address bar (?sort=asc or ?sort=desc)
    function handleSortToggle() {
        const nextSort = sort === "asc" ? "desc" : "asc";
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", nextSort);
        params.delete("page"); // Reset to page 1 on sort change
        router.push(`${pathname}?${params.toString()}`);

        toast.add({
            description: nextSort === "asc" ? "Sort: Ascending" : "Sort: Default (Descending)",
            timeout: 800,
        });
    }

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(news.length / paginate));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * paginate;
    const paginatedNews = news.slice(startIndex, startIndex + paginate);

    function handlePrevPage() {
        if (safePage > 1) {
            const params = new URLSearchParams(searchParams.toString());
            const prevPage = safePage - 1;
            if (prevPage > 1) {
                params.set("page", String(prevPage));
            } else {
                params.delete("page");
            }
            router.push(`${pathname}?${params.toString()}`);
        }
    }

    function handleNextPage() {
        if (safePage < totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(safePage + 1));
            router.push(`${pathname}?${params.toString()}`);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {/* Top Bar with Logout */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">News Feed</h1>
                    <p className="text-xs text-muted-foreground">Browse and search latest articles</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/news/dashboard"
                        className="px-3.5 py-1.5 rounded-xl border border-border text-sm font-medium hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
                    >
                        Dashboard →
                    </Link>
                    {showButton ? (
                        <button
                            onClick={async () => { await logout(); window.location.reload(); }}
                            className="px-3.5 py-1.5 rounded-xl border border-border text-sm font-medium hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => { router.push('/auth/login') }}
                            className="px-3.5 py-1.5 rounded-xl border border-border text-sm font-medium hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Search News Section */}
            <div className="pt-6 pb-4">
                <SearchNews />
            </div>

            {/* Articles Header & Sort */}
            <div className="flex items-center justify-between pt-4 pb-3">
                <h2 className="text-lg font-semibold tracking-tight">Articles</h2>
                <div>
                    <button
                        onClick={handleSortToggle}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors cursor-pointer"
                    >
                        Sort: {sort === "asc" ? "Ascending" : "Default"}
                    </button>
                </div>
            </div>

            {/* Articles List */}
            <div className="space-y-2.5">
                {isLoading ? (
                    <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
                        Loading news...
                    </div>
                ) : paginatedNews.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
                        No articles found for the given query.
                    </div>
                ) : (
                    paginatedNews.map((e) => (
                        <div key={e.id} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all">
                            <Link href={`/news/${encodeURIComponent(e.id)}`} prefetch={false} className="font-medium text-sm sm:text-base hover:text-primary transition-colors block leading-snug">
                                {e.title}
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pt-8 mt-6 border-t border-border flex items-center justify-between">
                <div className="flex gap-3">
                    <button
                        onClick={handlePrevPage}
                        disabled={safePage <= 1}
                        className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={safePage >= totalPages}
                        className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current page: <span className="font-bold text-foreground">{safePage}</span> of {totalPages}
                </div>
            </div>
        </div>
    );
}

export default function News() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background text-foreground py-8 px-4 text-center text-sm text-muted-foreground">Loading feed...</div>}>
            <NewsFeedContent />
        </Suspense>
    );
}
