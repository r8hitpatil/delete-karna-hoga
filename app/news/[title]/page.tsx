'use client'

import { useParams, useRouter } from "next/navigation"
import { useNewsStore } from "@/app/news/store/newsStore";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/api/auth/lib/session";

export default function NewsDetails() {
    
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const router = useRouter();

    const params = useParams();
    const rawTitle = params.title as string;
    const title = decodeURIComponent(rawTitle).trim();

    const searchNewsArr = useNewsStore((state) => state.searchNews);
    console.log('search',searchNewsArr);
    
    
    const searchNews = useNewsStore((state) => state.fetchSearchNews);
    useEffect(() => {
        async function checkAuthAndLoad(){
            const user = await getCurrentUser();
            if(!user) {
                router.push('/auth/login');
                return;
            }
            setIsAuthenticated(true);
            searchNews(title);
        }
        checkAuthAndLoad();
    },[title,searchNews,router]);

    if(!isAuthenticated){
        return <div>Checking authententication....</div>
    }

    return (
        <div>
            {searchNewsArr.map((e) => (
                <div key={e.title}>
                    <h1>Description</h1>
                    <p>{e.title}</p>
                    <p>{e.description}</p>
                </div>
            ))}
        </div>
    )
}