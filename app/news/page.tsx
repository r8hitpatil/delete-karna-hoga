'use client'

import { useQuery } from "@tanstack/react-query"
import { getNews } from "../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import ErrorNews from "../component/error-news";

export default function News() {

    const paginate = 5;
    const [isDebouce, setIsDebounce] = useState("");
    const [search, setSearch] = useState("");
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(paginate);
    const [asc, setAsc] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDebounce(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["news", isDebouce],
        queryFn: () => {
            const caseSensi = isDebouce.toLowerCase();
            const ok = search.localeCompare(caseSensi, undefined, { sensitivity: "base" });
            if (ok !== 0) {
                throw new Error("Search mismatch");
            }
            return getNews(isDebouce);
        },
        staleTime : 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <ErrorNews/>

    const { articles } = data;

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
        <div>
            <br />
            <div>
                <h1>Search</h1>
                <input placeholder="Hemlo" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <br />
            <h1>Articles</h1>
            <br />
            <div>
                <h1>-------------------------------------</h1>
                <h1>No sort simple mapping </h1>
                <h1>-------------------------------------</h1>
            </div>
            {articles.slice(next - paginate, next).map((article: any) => {
                return (
                    <div key={article.title}>
                        <Link href={`/news/${encodeURIComponent(article.title)}`} prefetch={false}>{article.title}</Link>
                    </div>
                )
            })}
            <div>
                <h1>-------------------------------------</h1>
                <button onClick={() => {
                    setAsc(!asc)
                    popUp()
                }}>Ascending</button>
                <h1>-------------------------------------</h1>
            </div>
            {
                asc ? articles.slice(next - paginate, next).sort((a: any, b: any) => -a.publishedAt.localeCompare(b.publishedAt)).map((article: any) => {
                    return (
                        <div key={article.title}>
                            <Link href={`/news/${encodeURIComponent(article.title)}`} prefetch={false}>{article.title}</Link>
                        </div>
                    )
                }) :
                    articles.slice(next - paginate, next).sort((a: any, b: any) => a.publishedAt.localeCompare(b.publishedAt)).map((article: any) => {
                        return (
                            <div key={article.title}>
                                <Link href={`/news/${encodeURIComponent(article.title)}`} prefetch={false}>{article.title}</Link>
                            </div>
                        )
                    })
            }
            <br />
            <div className='flex gap-5'>
                <button onClick={() => {
                    {
                        if (prev > 0 && next !== paginate) {
                            setPrev(prev - 1)
                            setNext(next - paginate)
                        };
                        console.log('Minus', prev);
                    }
                }}>Prev</button>
                <button onClick={() => {
                    {
                        if ((prev + 1) < Math.round(articles.length / paginate)) {
                            setPrev(prev + 1)
                            setNext(next + 5)
                            console.log('TF', Math.ceil(articles.length / paginate))
                        };
                        console.log('0th next', next - 5);
                        console.log('Plus', prev);
                        console.log(`---------------------`);

                    }
                }}>Next</button>
            </div>
            <br />
            <h1>Current page : {prev + 1}</h1>
        </div>
    )
}