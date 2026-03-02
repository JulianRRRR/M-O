"use client";

interface CodePanelProps {
  code: string;
  isVisible: boolean;
  onToggle: () => void;
}

export default function CodePanel({
  code,
  isVisible,
  onToggle,
}: CodePanelProps) {
  if (!isVisible) return null;

  return (
    <div className="flex flex-col h-full border-l border-[#e5e5e5] bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#333] shrink-0">
        <span className="text-xs text-[#999] font-medium">Code</span>
        <button
          onClick={onToggle}
          className="text-xs text-[#999] hover:text-white transition-colors"
        >
          Close
        </button>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-[13px] leading-relaxed text-[#d4d4d8] font-mono whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
