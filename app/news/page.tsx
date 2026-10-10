'use client'

import { useQuery } from "@tanstack/react-query"
import { getNews } from "../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import ErrorNews from "../component/error-news";
import SearchNews from "../component/search-news";
import { useNewsStore } from "@/app/news/store/newsStore";
import { logout } from "../auth/actions";

export default function News() {

    const searchNews = useNewsStore((state) => state.searchNews);
    const paginate = 5;
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(paginate);
    const [asc, setAsc] = useState(false);

    function popUp() {
        {
            asc ? toast.add({
                description: "Sorted",
                timeout: 800,
            }) :
                toast.add({
                    description: "Default",
                    timeout: 800
                })
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
                <div>
                    <button
                        onClick={async () => { await logout() }}
                        className="px-3.5 py-1.5 rounded-xl border border-border text-sm font-medium hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Search News Section */}
            <div className="pt-6 pb-4">
                <SearchNews />
                {/* {isFetching && <span>Searching....</span>} */}
            </div>

            {/* Articles Header & Sort */}
            <div className="flex items-center justify-between pt-4 pb-3">
                <h2 className="text-lg font-semibold tracking-tight">Articles</h2>
                <div>
                    <button
                        onClick={() => {
                            setAsc(!asc)
                            popUp()
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors cursor-pointer"
                    >
                        Sort: {asc ? "Ascending" : "Default"}
                    </button>
                </div>
            </div>

            {/* Articles List */}
            <div className="space-y-2.5">
                {asc ? searchNews.slice(next-5,next).sort((a: any, b: any) => -a.publishedAt.localeCompare(b.publishedAt)).map((e) => (
                    <div key={e.title} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all">
                        <Link href={`/news/${encodeURIComponent(e.title)}`} prefetch={false} className="font-medium text-sm sm:text-base hover:text-primary transition-colors block leading-snug">
                            {e.title}
                        </Link>
                    </div>
                )) : searchNews.slice(next-5,next).sort((a: any, b: any) => a.publishedAt.localeCompare(b.publishedAt)).map((e) => (
                    <div key={e.title} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all">
                        <Link href={`/news/${encodeURIComponent(e.title)}`} prefetch={false} className="font-medium text-sm sm:text-base hover:text-primary transition-colors block leading-snug">
                            {e.title}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pt-8 mt-6 border-t border-border flex items-center justify-between">
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            {
                                if (prev > 0 && next !== paginate) {
                                    setPrev(prev - 1)
                                    setNext(next - paginate)
                                };
                                console.log('Minus', prev);
                            }
                        }}
                        className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => {
                            {
                                if ((prev + 1) < Math.round(searchNews.length / paginate)) {
                                    setPrev(prev + 1)
                                    setNext(next + 5)
                                    console.log('TF', Math.ceil(searchNews.length / paginate))
                                };
                                console.log('0th next', next - 5);
                                console.log('Plus', prev);
                                console.log(`---------------------`);

                            }
                        }}
                        className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current page: <span className="font-bold text-foreground">{prev + 1}</span>
                </div>
            </div>
        </div>
    )
}