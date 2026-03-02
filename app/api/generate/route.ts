import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Clay, an AI that builds custom web applications for businesses. Your job is to generate complete, working, beautiful HTML applications based on user descriptions.

RULES:
1. Always respond with a COMPLETE, self-contained HTML document (<!DOCTYPE html>...</html>)
2. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
3. Make the UI beautiful, modern, and professional — use clean layouts, proper spacing, nice colors
4. Include realistic sample data so the app looks real and alive
5. Make it fully interactive with vanilla JavaScript — buttons should work, forms should submit, tabs should switch
6. The app must work completely standalone in a single HTML file
7. Use modern design patterns: cards, proper typography, subtle shadows, rounded corners
8. Include proper responsive design
9. If the user asks for changes to an existing app, modify the provided HTML accordingly while keeping all existing functionality
10. NEVER include explanations or markdown — ONLY output the HTML document
11. Use professional, consistent color schemes — avoid harsh colors
12. Add realistic placeholder content that matches the business type

When modifying an existing app:
- Keep all existing features intact
- Add the requested changes
- Maintain the same design language
- Output the complete modified HTML document`;

export async function POST(req: NextRequest) {
  try {
    const { messages, currentHtml } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add ANTHROPIC_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const claudeMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })
    );

    if (currentHtml && claudeMessages.length > 0) {
      const lastUserMsg = claudeMessages[claudeMessages.length - 1];
      if (lastUserMsg.role === "user") {
        lastUserMsg.content = `Current app HTML:\n\`\`\`html\n${currentHtml}\n\`\`\`\n\nUser request: ${lastUserMsg.content}`;
      }
    }

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: claudeMessages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
