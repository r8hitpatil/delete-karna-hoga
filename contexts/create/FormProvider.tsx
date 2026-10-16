"use client";

import React, { useState, useEffect } from "react";
import { CarouselApi } from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/api/auth/lib/session";
import { createFeedbackv2 } from "@/app/api/feedback/action";
import FormContext, {
  FormContextDispatch,
  FormContextState,
} from "./FormContext";

interface FormProviderProps {
  children: React.ReactNode;
}

export default function FormProvider({ children }: FormProviderProps) {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [news, setNews] = useState<string>("");
  const [api, setApi] = useState<CarouselApi>();
  const [clientUserId, setClientUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchUserId() {
      const res = await getCurrentUser();
      if (res) {
        setClientUserId(res.id);
      }
    }
    fetchUserId();
  }, []);

  function nextPage() {
    api?.scrollNext();
  }

  function prevPage() {
    api?.scrollPrev();
  }

  function reset() {
    setName("");
    setAge(0);
    setEmail("");
    setFeedback("");
    setNews("");
    api?.scrollTo(0);
  }

  async function handleSubmit() {
    if (!clientUserId) {
      alert("Please login");
      return;
    }

    const res = await createFeedbackv2(
      { name, age, feedback, email },
      clientUserId,
      news
    );

    if (res.success) {
      alert("Feedback submitted successfully!");
      reset();
      router.push("/");
    } else {
      alert(res.message);
    }
  }

  const formContextState: FormContextState = {
    name,
    age,
    email,
    feedback,
    news,
    api,
  };

  const formContextDispatch: FormContextDispatch = {
    setName,
    setAge,
    setEmail,
    setFeedback,
    setNews,
    setApi,
    nextPage,
    prevPage,
    handleSubmit,
    reset,
  };

  return (
    <FormContext.Provider
      value={{ ...formContextState, ...formContextDispatch }}
    >
      {children}
    </FormContext.Provider>
  );
}
