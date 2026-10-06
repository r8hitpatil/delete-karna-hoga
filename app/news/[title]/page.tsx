'use client'

import { getNews } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import ErrorNews from "../../component/error-news";
import LoadingNews from "../../component/loading-news";
import NotFound from "@/app/component/not-found";

export default function NewsDetails() {

    const params = useParams();
    const rawTitle = params.title as string;
    const title = decodeURIComponent(rawTitle).trim();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["news",""],
        queryFn: () => getNews(),
        staleTime : 5 * 60 * 1000,
        select: (data) =>
            data.articles.find((e: any) => e.title === title),
    });

    if (isLoading) return LoadingNews();
    if (isError) return ErrorNews();
    if (!data) return NotFound();



    return (
        <div>
            <p>{data.title}</p>
            <p>{data.description}</p>
        </div>
    )
}