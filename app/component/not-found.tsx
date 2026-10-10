export default function NotFound(){
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Content Not Found</h1>
            <p className="text-sm text-muted-foreground mt-2">The requested news item could not be found.</p>
        </div>
    )
}