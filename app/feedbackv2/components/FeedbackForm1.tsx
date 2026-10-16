"use client";

import { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";

export default function FeedbackForm1() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FeedbackForm1 must be used within a FormProvider");
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
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
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
        className={`p-2.5 rounded-lg text-sm font-semibold transition-all ${
          name && age && email
            ? "bg-white text-black cursor-pointer hover:bg-zinc-200 active:scale-[0.99]"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        }`}
        onClick={() => {
          if (name && age && email) nextPage();
        }}
      >
        Next
      </button>
    </form>
  );
}
