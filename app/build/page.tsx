"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ChatPanel, { Message } from "../components/ChatPanel";
import PreviewPanel from "../components/PreviewPanel";
import CodePanel from "../components/CodePanel";

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#e5e5e5] border-t-[#111] rounded-full animate-spin" />
        </div>
      }
    >
      <BuildPageContent />
    </Suspense>
  );
}

function BuildPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat");

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages,
            currentHtml: generatedHtml,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to generate");
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullResponse += decoder.decode(value, { stream: true });
          }
        }

        const htmlMatch = fullResponse.match(
          /<!DOCTYPE html>[\s\S]*<\/html>/i
        );
        if (htmlMatch) {
          setGeneratedHtml(htmlMatch[0]);
          setActiveTab("preview");
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullResponse },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, generatedHtml]
  );

  useEffect(() => {
    const initialPrompt = searchParams.get("prompt");
    if (initialPrompt && messages.length === 0) {
      setInput("");
      sendMessage(initialPrompt);
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#e5e5e5] shrink-0 bg-white z-10">
        <Link
          href="/"
          className="text-sm font-extrabold tracking-tight hover:opacity-70 transition-opacity"
        >
          Clay
        </Link>
        <div className="flex items-center gap-2">
          {/* Mobile tab switcher */}
          <div className="flex sm:hidden bg-[#f4f4f5] rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "chat"
                  ? "bg-white text-[#111] shadow-sm"
                  : "text-[#999]"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "preview"
                  ? "bg-white text-[#111] shadow-sm"
                  : "text-[#999]"
              }`}
            >
              Preview
            </button>
          </div>

          {generatedHtml && (
            <button
              onClick={() => setShowCode(!showCode)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                showCode
                  ? "bg-[#111] text-white"
                  : "bg-[#f4f4f5] text-[#555] hover:bg-[#e5e5e5]"
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>
              Code
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat panel */}
        <div
          className={`${
            activeTab === "chat" ? "flex" : "hidden"
          } sm:flex w-full sm:w-[420px] sm:min-w-[360px] sm:max-w-[480px] sm:border-r sm:border-[#e5e5e5] flex-col`}
        >
          <ChatPanel
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSend={() => sendMessage(input)}
            isLoading={isLoading}
          />
        </div>

        {/* Preview panel */}
        <div
          className={`${
            activeTab === "preview" ? "flex" : "hidden"
          } sm:flex flex-1 flex-col`}
        >
          <PreviewPanel html={generatedHtml} isLoading={isLoading} />
        </div>

        {/* Code panel */}
        {showCode && (
          <div className="hidden sm:flex w-[400px]">
            <CodePanel
              code={generatedHtml}
              isVisible={showCode}
              onToggle={() => setShowCode(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
