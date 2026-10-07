'use client'

import { useParams } from "next/navigation"
import { useNewsStore } from "@/app/store/newsStore";
import { useEffect } from "react";

export default function NewsDetails() {

    const params = useParams();
    const rawTitle = params.title as string;
    const title = decodeURIComponent(rawTitle).trim();
    
    
    const searchNews = useNewsStore((state) => state.fetchSearchNews);
    useEffect(() => {
        searchNews(title);    
    },[])
    
    const searchNewsArr = useNewsStore((state) => state.searchNews);
    console.log(searchNewsArr);

    return (
        <div>
            {searchNewsArr.map((e) => (
                <div>
                    <h1>Description</h1>
                    <p>{e.title}</p>
                    <p>{e.description}</p>
                </div>
            ))}
        </div>
    )
}