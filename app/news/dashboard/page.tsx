"use client"

import { useEffect, useState } from "react";
import { createNews } from "../../api/news/action";
import { useNewsStore } from "../store/newsStore";
import { toast } from "@/components/ui/toast";
import Link from "next/link";
import SearchNews from "@/app/component/search-news";
import { useQueryClient } from "@tanstack/react-query";

export default function NewsDashboard() {

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

  const fetchSearchNews = useNewsStore((state) => state.fetchSearchNews);
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchSearchNews("");
  }, [fetchSearchNews]);

  const paginate = 5;
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(paginate);

  const [asc, setAsc] = useState(false);

  const searchNews = useNewsStore((state) => state.searchNews);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pt-4 pb-2 border-b border-border">
        <h2 className="text-xl font-bold tracking-tight">Create Article</h2>
        <Link
          href="/news"
          className="px-3.5 py-1.5 rounded-xl border border-border text-xs font-medium hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
        >
          ← News Feed
        </Link>
      </div>
      <div className="p-6 rounded-2xl border border-border bg-card shadow-xs">
        <form className="space-y-4" action={async (formData) => { await createNews(formData); await fetchSearchNews(""); await queryClient.invalidateQueries({ queryKey : ["news"] }); }} >
          <div className="space-y-1.5">
            <h1 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</h1>
            <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="text" placeholder="Enter title" name="title" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Desc</h1>
            <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="text" placeholder="Enter description" name="description" />
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs" type="submit">Create News</button>
        </form>
      </div>
      <div className="flex items-center justify-between pt-4 pb-3">
        <h2 className="text-lg font-semibold tracking-tight">Update Articles</h2>
        <div className="pt-6 pb-4">
          <SearchNews />
        </div>
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
        {asc ? searchNews.slice(next - 5, next).sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).map((e) => (
          <div key={e.id} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all">
            <Link href={`/news/dashboard/${encodeURIComponent(e.id)}`} prefetch={false} className="font-medium text-sm sm:text-base hover:text-primary transition-colors block leading-snug">
              {e.title}
            </Link>
          </div>
        )) : searchNews.slice(next - 5, next).sort((a: any, b: any) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()).map((e) => (
          <div key={e.id} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all">
            <Link href={`/news/dashboard/${encodeURIComponent(e.id)}`} prefetch={false} className="font-medium text-sm sm:text-base hover:text-primary transition-colors block leading-snug">
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