"use client";

import { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import { useNewsSearch } from "@/app/api/news-search.api";

export default function FinalForm() {
  const context = useContext(FormContext);

  const { data: searchNews = [] } = useNewsSearch("");

  if (!context) {
    throw new Error("FinalForm must be used within a FormProvider");
  }

  const { name, age, email, feedback, news, prevPage, handleSubmit } = context;

  const searchNewsArticle = searchNews.find((item) => item.id === news);

  return (
    <div className="text-sm space-y-2.5">
      <h2 className="text-lg font-bold mb-3 text-white">Review</h2>
      <div className="border border-zinc-800/80 bg-zinc-900/40 rounded-xl p-4 space-y-2">
        <p>
          <span className="text-zinc-400">Name:</span>{" "}
          <span className="text-white font-medium">{name}</span>
        </p>
        <p>
          <span className="text-zinc-400">Age:</span>{" "}
          <span className="text-white font-medium">{age}</span>
        </p>
        <p>
          <span className="text-zinc-400">Email:</span>{" "}
          <span className="text-white font-medium">{email}</span>
        </p>
        <p>
          <span className="text-zinc-400">Feedback:</span>{" "}
          <span className="text-white font-medium">{feedback}</span>
        </p>
        <p>
          <span className="text-zinc-400">News:</span>{" "}
          <span className="text-white font-medium">
            {searchNewsArticle?.title || "None"}
          </span>
        </p>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          className="flex-1 p-2.5 rounded-lg text-sm font-semibold border border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-200 transition-all cursor-pointer active:scale-[0.99]"
          onClick={() => prevPage()}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold p-2.5 rounded-lg text-sm cursor-pointer transition-all active:scale-[0.99] shadow-lg shadow-emerald-900/30"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
