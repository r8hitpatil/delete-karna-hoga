"use client";

import { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import { useNewsSearch } from "@/app/api/news-search.api";

export default function FeedbackForm2() {
  const context = useContext(FormContext);

  const { data: searchNews = [], isLoading } = useNewsSearch("");

  if (!context) {
    throw new Error("FeedbackForm2 must be used within a FormProvider");
  }

  const { feedback, news, setFeedback, setNews, nextPage, prevPage } = context;

  return (
    <form action="" className="flex flex-col">
      <label className="text-xs font-medium text-zinc-400 mb-1.5">Feedback</label>
      <input
        type="text"
        placeholder="Your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
        className="border border-zinc-700/80 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-400/20 focus:outline-none bg-zinc-900/70 rounded-lg p-2.5 text-sm mb-4 text-white transition-all"
      />

      <label className="text-xs font-medium text-zinc-400 mb-1.5">News</label>
      <select
        name="news-selection"
        id="news-selection"
        value={news}
        onChange={(e) => setNews(e.target.value)}
        className="bg-zinc-900/90 text-white border border-zinc-700/80 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-400/20 focus:outline-none rounded-lg p-2.5 text-sm mb-5 cursor-pointer transition-all"
        required
      >
        <option value="" disabled>
          {isLoading ? "-- Loading articles..." : "-- Select an article"}
        </option>
        {searchNews.map((e) => (
          <option key={e.id} value={e.id}>
            {e.title}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 p-2.5 rounded-lg text-sm font-semibold border border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-200 transition-all cursor-pointer active:scale-[0.99]"
          onClick={() => prevPage()}
        >
          Previous
        </button>
        <button
          type="button"
          className={`flex-1 p-2.5 rounded-lg text-sm font-semibold transition-all ${
            feedback && news
              ? "bg-white text-black cursor-pointer hover:bg-zinc-200 active:scale-[0.99]"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
          onClick={() => {
            if (feedback && news) nextPage();
          }}
        >
          Next
        </button>
      </div>
    </form>
  );
}
