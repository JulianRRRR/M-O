"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    router.push(`/build?prompt=${encodeURIComponent(prompt)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <h1 className="text-2xl font-bold tracking-tight mb-8 text-[#111]">
        Clay
      </h1>

      <div className="w-full max-w-[560px]">
        <div className="border border-[#e0e0e0] rounded-2xl p-4 transition-all focus-within:border-[#bbb] focus-within:shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to build?"
            rows={3}
            autoFocus
            className="w-full resize-none border-none outline-none text-[15px] leading-relaxed placeholder:text-[#bbb] bg-transparent text-[#111]"
          />
          <div className="flex justify-end pt-1">
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="flex items-center justify-center w-9 h-9 bg-[#111] text-white rounded-xl disabled:opacity-20 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
