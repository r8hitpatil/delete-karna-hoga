export const getNews = async (search:string = "") => {
    const endpoint = search 
    ? `/api/news?q=${encodeURIComponent(search)}`
    : `/api/news`;
    
    const response = await fetch(endpoint);
    return response.json(); 
}