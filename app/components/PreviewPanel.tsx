"use client";

interface PreviewPanelProps {
  html: string;
  isLoading: boolean;
}

export default function PreviewPanel({ html, isLoading }: PreviewPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-[#e5e5e5] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
            <span className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
            <span className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
          </div>
          <span className="text-xs text-[#999] font-medium">Preview</span>
        </div>
        {isLoading && (
          <span className="text-xs text-[#0d9488] font-medium animate-pulse">
            Generating...
          </span>
        )}
      </div>

      {/* Preview iframe */}
      <div className="flex-1 relative">
        {html ? (
          <iframe
            srcDoc={html}
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-forms allow-modals"
            title="App preview"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-[280px]">
              <div className="w-16 h-16 bg-white border border-[#e5e5e5] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-[#ccc]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>
              <p className="text-sm text-[#999]">
                Your app will appear here once you describe what you need.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
