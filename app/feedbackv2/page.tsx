"use client";

import { useContext } from "react";
import Link from "next/link";
import FormProvider from "@/contexts/create/FormProvider";
import FormContext from "@/contexts/create/FormContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import FeedbackForm1 from "./components/FeedbackForm1";
import FeedbackForm2 from "./components/FeedbackForm2";
import FinalForm from "./components/FinalForm";

function FeedbackFormv2Content() {
  const { setApi } = useContext(FormContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md sm:max-w-lg flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Feedback Form v2
        </h1>
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
  );
}

export default function FeedbackFormv2() {
  return (
    <FormProvider>
      <FeedbackFormv2Content />
    </FormProvider>
  );
}
