"use client"

import { useParams, useRouter } from "next/navigation";
import { useNewsStore } from "../../store/newsStore";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/api/auth/lib/session";
import { updateNews } from "../../../api/news/dashboard/action";
import { getNewsById } from "../../../api/news/action";
import { useQueryClient } from "@tanstack/react-query";

type Article = {
    id: string;
    title: string;
    description: string;
};

export default function UpdateArticles() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const params = useParams();
    console.log('Params', params);
    const [article, setArticle] = useState<Article | null>();
    const id = params.id as string;

    const searchNews = useNewsStore((state) => state.fetchSearchNews);
    useEffect(() => {
        async function checkAuthAndLoad() {
            const user = await getCurrentUser();
            if (!user) {
                router.push('/auth/login');
                return;
            }
            setIsAuthenticated(true);
            async function getData(id:string){
                const res = await getNewsById(id);
                if (res.success && res.data) setArticle(res.data);
            }
            getData(id);
        }
        checkAuthAndLoad();
    }, [id, searchNews, router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm font-medium text-muted-foreground animate-pulse">
                Checking authentication...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2 leading-snug">{article?.title}</h1>
                </div>
                <div className="pt-6 border-t border-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</span>
                    <p className="text-base text-muted-foreground mt-2 leading-relaxed">{article?.description}</p>
                </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                <h2 className="text-xl font-bold tracking-tight">Edit Form</h2>
                <form key={article?.title} className="flex flex-col gap-4" action={async (formData) => { if (!article?.id) return; ; await updateNews(article?.id, formData) ; await queryClient.invalidateQueries({ queryKey : ["news"] }); router.push("/news/dashboard"); }}>
                    <div className="space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="text" defaultValue={article?.title} name="title" />
                    </div>
                    <div className="space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</span>
                        <textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" defaultValue={article?.description} name="description" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs" type="submit">Save changes</button>
                        <button className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-[0.98] transition-all cursor-pointer" type="button" onClick={() => router.push("/news/dashboard")}>Discard</button>
                    </div>
                </form>
            </div>
        </div>
    )
}