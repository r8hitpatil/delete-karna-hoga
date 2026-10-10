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
        <div>
            <div>
                <button onClick={async () => { await logout() }}>Logout</button>
            </div>
            <br />
            <div>
                <SearchNews />
                {/* {isFetching && <span>Searching....</span>} */}
            </div>
            <br />
            <h1>Articles</h1>
            <div>
                <h1>-------------------------------------</h1>
                <button onClick={() => {
                    setAsc(!asc)
                    popUp()
                }}>Ascending</button>
                <h1>-------------------------------------</h1>
            </div>
            <br />
            <div>
                {asc ? searchNews.slice(next-5,next).sort((a: any, b: any) => -a.publishedAt.localeCompare(b.publishedAt)).map((e) => (
                    <div key={e.title}>
                        <Link href={`/news/${encodeURIComponent(e.title)}`} prefetch={false}>{e.title}</Link>
                    </div>
                )) : searchNews.slice(next-5,next).sort((a: any, b: any) => a.publishedAt.localeCompare(b.publishedAt)).map((e) => (
                    <div>
                        <Link href={`/news/${encodeURIComponent(e.title)}`} prefetch={false}>{e.title}</Link>
                    </div>
                ))}
            </div>
            <div>
                <h1>Difference is here ?</h1>
                <p>
                    -------------------------------------------
                </p>
            </div>
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
                        if ((prev + 1) < Math.round(searchNews.length / paginate)) {
                            setPrev(prev + 1)
                            setNext(next + 5)
                            console.log('TF', Math.ceil(searchNews.length / paginate))
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