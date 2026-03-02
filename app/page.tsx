"use client";

import Link from "next/link";
import { useState } from "react";

const EXAMPLES = [
  {
    label: "Client scheduling",
    prompt:
      "I run a services business and need a scheduling system where clients can book appointments, my team can see their daily schedule, and I get notified of cancellations.",
  },
  {
    label: "Inventory tracker",
    prompt:
      "I need an inventory management system for my retail store. Track stock levels, get alerts when items run low, and log incoming shipments.",
  },
  {
    label: "Employee hours",
    prompt:
      "I want a simple app where my 20 employees can log their hours, I can approve timesheets, and export everything for payroll.",
  },
  {
    label: "Custom CRM",
    prompt:
      "I need a CRM built for my consulting firm. Track leads, log meetings, set follow-up reminders, and see a pipeline overview.",
  },
  {
    label: "Project tracker",
    prompt:
      "I run a construction company and need a project tracker. Assign tasks to crews, track progress per job site, and manage deadlines.",
  },
  {
    label: "Invoice generator",
    prompt:
      "I need an invoicing tool for my freelance business. Create invoices from templates, track payments, and send automatic reminders.",
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-transparent transition-colors">
        <div className="max-w-[1100px] mx-auto h-16 flex items-center justify-between px-6">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            Clay
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#555] hover:text-[#111] transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-[#555] hover:text-[#111] transition-colors"
            >
              Features
            </a>
            <Link
              href="/build"
              className="text-sm font-semibold bg-[#111] text-white px-4 py-2 rounded-lg hover:opacity-85 transition-opacity"
            >
              Start building
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
            What does your
            <br />
            business need?
          </h1>
          <p className="text-lg text-[#555] max-w-[520px] mx-auto mb-10 leading-relaxed">
            Describe it. Clay builds custom software for your business — in
            minutes, not months. No code required.
          </p>

          {/* Prompt box */}
          <div className="max-w-[680px] mx-auto mb-6">
            <div className="border-[1.5px] border-[#e5e5e5] rounded-2xl p-4 transition-all focus-within:border-[#0d9488] focus-within:shadow-[0_0_0_3px_#f0fdfa,0_8px_32px_rgba(0,0,0,0.06)]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. I run a plumbing company with 12 employees. I need an app to manage scheduling, track jobs, and send invoices..."
                rows={3}
                className="w-full resize-none border-none outline-none text-[15px] leading-relaxed p-2 placeholder:text-[#999] bg-transparent"
              />
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs text-[#999]">
                  Describe your business and what you need
                </span>
                <Link
                  href={`/build${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white rounded-xl text-sm font-semibold hover:opacity-85 transition-all hover:-translate-y-px"
                >
                  Build it
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-[680px] mx-auto">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setPrompt(ex.prompt)}
                className="px-3.5 py-2 bg-white border border-[#e5e5e5] rounded-full text-[13px] text-[#555] cursor-pointer transition-all hover:border-[#99f6e4] hover:text-[#0d9488] hover:bg-[#f0fdfa]"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <hr className="max-w-[1100px] mx-auto border-[#f0f0f0]" />

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#0d9488] mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            From idea to app
            <br />
            in three steps
          </h2>
          <p className="text-[17px] text-[#555] max-w-[520px] leading-relaxed mb-14">
            No technical skills required. If you can describe it, Clay can build
            it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "1",
                title: "Describe your business",
                desc: "Tell Clay what your company does, what problems you face, and what you wish your software could do. Just speak naturally.",
              },
              {
                num: "2",
                title: "Get your custom app",
                desc: "Clay builds a working application tailored to your exact workflow. Scheduling, invoicing, client management — your way.",
              },
              {
                num: "3",
                title: "Adjust anytime",
                desc: 'Need a change? Just say it. "Add a notes field" or "Email me a weekly summary." Clay updates instantly.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 bg-[#f0fdfa] text-[#0d9488] rounded-lg font-extrabold text-sm mb-5">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="max-w-[1100px] mx-auto border-[#f0f0f0]" />

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#0d9488] mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="text-[17px] text-[#555] max-w-[520px] leading-relaxed mb-14">
            Software that works for your business, not the other way around.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Plain language",
                desc: "No code, no jargon. Describe what you need like you'd tell a colleague.",
                icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              },
              {
                title: "Ready in minutes",
                desc: "Your custom application is generated and deployed in minutes. Start using it today.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Works everywhere",
                desc: "Desktop, tablet, phone. Every device, every team member. No installs.",
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
              },
              {
                title: "Always evolving",
                desc: "Your business changes. Ask Clay to adjust anything, anytime.",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              },
              {
                title: "Secure & hosted",
                desc: "Hosting, security, backups, updates. All handled. You focus on your business.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
              {
                title: "Fraction of the cost",
                desc: "Replace your entire SaaS stack. Pay less for software that does more.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#f0fdfa] rounded-[9px] mb-4 text-[#0d9488]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={f.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold mb-1">{f.title}</h3>
                <p className="text-[13px] text-[#555] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="max-w-[1100px] mx-auto border-[#f0f0f0]" />

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-[560px] mx-auto">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#0d9488] mb-3">
            Get started
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Ready to build software
            <br />
            that actually fits?
          </h2>
          <p className="text-[17px] text-[#555] max-w-[520px] mx-auto leading-relaxed mb-8">
            Start building for free. Describe what your business needs and watch
            it come to life.
          </p>
          <Link
            href="/build"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111] text-white rounded-xl text-base font-semibold hover:opacity-85 transition-all hover:-translate-y-px"
          >
            Start building — it&apos;s free
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f0f0f0] py-8 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-extrabold">Clay</span>
            <span className="text-xs text-[#999]">
              &copy; 2026 Clay. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[#999] hover:text-[#555] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-[#999] hover:text-[#555] transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:hello@clay.build"
              className="text-xs text-[#999] hover:text-[#555] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
