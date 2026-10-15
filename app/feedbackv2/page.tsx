"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useNewsStore } from "../news/store/newsStore";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useFeedBackStore } from "../news/store/feedbackStorev2";
import { getCurrentUser } from "../api/auth/lib/session";
import { createFeedbackv2 } from "../api/feedback/action";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FeedbackFormContextType = {
  name: string;
  age: number;
  email: string;
  feedback: string;
  news: string;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setEmail: (email: string) => void;
  setFeedback: (feedback: string) => void;
  setNews: (news: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  handleSubmit: () => void;
};

const FeedbackFormContext = createContext<FeedbackFormContextType | undefined>(
  undefined,
);

export default function FeedbackFormv2() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [news, setNews] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [clientUserId, setClientUserId] = useState<string | null>();
  const { reset } = useFeedBackStore((state) => state);
  const router = useRouter();

  function nextPage() {
    return api?.scrollNext();
  }

  function prevPage() {
    return api?.scrollPrev();
  }

  async function sendUserId() {
    const res = await getCurrentUser();
    if (!res) {
      return { success: false, message: "Unauthorized request" };
    }
    setClientUserId(res.id);
    return {
      email,
      clientUserId,
    };
  }

  async function handleSubmit() {
    if (!clientUserId) {
      alert("Please login");
      return;
    }

    const res = await createFeedbackv2(
      { name, age, feedback, email },
      clientUserId,
      news,
    );

    if (res.success) {
      alert("Feedback submitted successfully!");
      router.push("/");
      reset();
    } else {
      alert(res.message);
    }
  }
  useEffect(() => {
    sendUserId();
  }, [])

  return (
    <FeedbackFormContext.Provider
      value={{
        name,
        age,
        email,
        feedback,
        news,
        setName,
        setAge,
        setEmail,
        setFeedback,
        setNews,
        nextPage,
        prevPage,
        handleSubmit,
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md sm:max-w-lg flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Feedback Form v2</h1>
          <Link
            href="/news"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 transition-all cursor-pointer active:scale-[0.98]"
          >
            ← News
          </Link>
        </div>
        <Carousel className="w-full max-w-md sm:max-w-lg" setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <Card className="border border-zinc-700/80 hover:border-zinc-600 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-all">
                <CardContent className="flex flex-col justify-center p-8 min-h-[380px]">
                  <FeedbackForm1 />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="border border-zinc-700/80 hover:border-zinc-600 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-all">
                <CardContent className="flex flex-col justify-center p-8 min-h-[380px]">
                  <FeedbackForm2 />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="border border-zinc-700/80 hover:border-zinc-600 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-all">
                <CardContent className="flex flex-col justify-center p-8 min-h-[380px]">
                  <FinalForm />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </FeedbackFormContext.Provider>
  );
}

function FeedbackForm1() {
  const context = useContext(FeedbackFormContext);

  if (!context) {
    throw new Error("Feedback must be within a FeedbackForm v2 provider");
  }

  const { name, age, email, setName, setAge, setEmail, nextPage } = context;

  return (
    <form action="" className="flex flex-col">
      <label className="text-xs font-medium text-zinc-400 mb-1.5">Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-zinc-700/80 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-400/20 focus:outline-none bg-zinc-900/70 rounded-lg p-2.5 text-sm mb-4 text-white transition-all"
      />

      <label className="text-xs font-medium text-zinc-400 mb-1.5">Age</label>
      <input
        type="number"
        placeholder="Age"
        value={age || ""}
        onChange={(e) => setAge(parseInt(e.target.value))}
        required
        className="border border-zinc-700/80 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-400/20 focus:outline-none bg-zinc-900/70 rounded-lg p-2.5 text-sm mb-4 text-white transition-all"
      />

      <label className="text-xs font-medium text-zinc-400 mb-1.5">Email</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-zinc-700/80 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-400/20 focus:outline-none bg-zinc-900/70 rounded-lg p-2.5 text-sm mb-5 text-white transition-all"
      />

      <button
        type="button"
        className={`p-2.5 rounded-lg text-sm font-semibold transition-all ${name && age && email ? "bg-white text-black cursor-pointer hover:bg-zinc-200 active:scale-[0.99]" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
        onClick={() => {
          if (name && age && email) nextPage();
        }}
      >
        Next
      </button>
    </form>
  );
}

function FeedbackForm2() {
  const context = useContext(FeedbackFormContext);

  const { searchNews, fetchSearchNews } = useNewsStore((state) => state);

  useEffect(() => {
    fetchSearchNews("");
  }, [fetchSearchNews]);

  if (!context) {
    throw new Error("Feedback must be within a FeedbackForm v2 provider");
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
          -- Select an article
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
          className={`flex-1 p-2.5 rounded-lg text-sm font-semibold transition-all ${feedback && news ? "bg-white text-black cursor-pointer hover:bg-zinc-200 active:scale-[0.99]" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
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

function FinalForm() {
  const context = useContext(FeedbackFormContext);

  if (!context) {
    throw new Error("Feedback must be within a FeedbackForm v2 provider");
  }

  const { name, age, email, feedback, news, prevPage, handleSubmit } = context;

  const { searchNews, fetchSearchNews } = useNewsStore((state) => state);

  useEffect(() => {
    fetchSearchNews("");
  }, [fetchSearchNews]);

  const searchNewsArticle = searchNews.find((item) => item.id === news);

  return (
    <div className="text-sm space-y-2.5">
      <h2 className="text-lg font-bold mb-3 text-white">Review</h2>
      <div className="border border-zinc-800/80 bg-zinc-900/40 rounded-xl p-4 space-y-2">
        <p><span className="text-zinc-400">Name:</span> <span className="text-white font-medium">{name}</span></p>
        <p><span className="text-zinc-400">Age:</span> <span className="text-white font-medium">{age}</span></p>
        <p><span className="text-zinc-400">Email:</span> <span className="text-white font-medium">{email}</span></p>
        <p><span className="text-zinc-400">Feedback:</span> <span className="text-white font-medium">{feedback}</span></p>
        <p><span className="text-zinc-400">News:</span> <span className="text-white font-medium">{searchNewsArticle?.title || "None"}</span></p>
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
