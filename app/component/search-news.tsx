import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getNews } from "../lib/utils";
import { useNewsStore } from "../store/newsStore";

export default function SearchNews(){

    const [search,setSearch] = useState("");
    const [isDebounce,setIsDebounce] = useState("");
    const caseSensi = isDebounce.trim().toLowerCase();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDebounce(search)
            searchNews(search);
        }, 300);
        console.log(isDebounce);

        return () => clearTimeout(timer);
    },[search])

    const { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ["news", caseSensi],
        queryFn: () => getNews(caseSensi),
        staleTime : 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000
    })

    const searchNews = useNewsStore((state) => state.fetchSearchNews)

    return (
        <div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search news'}/>
            <button onClick={() => setIsDebounce(search)}>Search</button> <br />
            {isDebounce}
        </div>
    )
}