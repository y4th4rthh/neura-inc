"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"

const previews = [
  {
    id: 1,
    label: "Landing Page",
    tag: "Home",
    description: "A clean, focused start page built for speed — jump into anything instantly.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne1.png",
  },
  {
    id: 2,
    label: "Multi-Tab",
    tag: "Tabs",
    description: "Fluid multi-tab browsing with a minimal chrome — switch contexts without friction.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne2.png",
  },
  {
    id: 3,
    label: "AI Overview",
    tag: "Search",
    description: "Every web search surfaces an AI-generated overview right alongside results.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne3.png",
  },
  {
    id: 4,
    label: "Follow-ups",
    tag: "Context",
    description: "Ask follow-up questions and get contextual summaries without leaving the page.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne4.png",
  },
  {
    id: 5,
    label: "Context Menu",
    tag: "Native",
    description: "Right-click anywhere to access AI actions — summarize, translate, explain instantly.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne5.png",
  },
  {
    id: 6,
    label: "Shortcuts & URLs",
    tag: "Power",
    description: "Custom keyboard shortcuts and native URL commands for a true power-user workflow.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne6.png",
  },
  {
    id: 7,
    label: "Adblocker",
    tag: "Privacy",
    description: "Persistent, built-in ad and tracker blocking — no extensions needed, ever.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne7.png",
  },
  {
    id: 8,
    label: "Browser History",
    tag: "History",
    description: "Smart history view with search, filters, and AI-assisted session recall.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne8.png",
  },
  {
    id: 9,
    label: "Downloads",
    tag: "Files",
    description: "A dedicated downloads tab to track, manage, and open files without leaving the browser.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/ne9.png",
  },
]

export default function OutlookExplore() {
  const [active, setActive] = useState(0)
  const current = previews[active]

  return (
    <section id="outlook-explore" className="py-20 md:py-32 px-4 bg-card/50">
      <style>{`
        @keyframes exploreIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .explore-fade {
          animation: exploreIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .explore-tab {
          position: relative;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground mb-4 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
            Browser Outlook
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Neura<span className="text-sky-400">.explore</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            An AI-integrated browser built for the way you actually think — search, summarize, and act without switching apps.
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Sidebar tabs */}
          <div className="lg:w-56 w-full flex lg:flex-col flex-row lg:overflow-visible overflow-x-auto gap-1.5 shrink-0 pb-1 hide-scrollbar">
            {previews.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`explore-tab text-left px-4 py-3 rounded-xl border whitespace-nowrap lg:whitespace-normal
                  ${active === i
                    ? "bg-white/8 border-white/15 text-foreground"
                    : "bg-transparent border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border
                      ${active === i
                        ? "border-sky-500/50 bg-sky-500/15 text-sky-300"
                        : "border-white/10 bg-white/5 text-muted-foreground"
                      }`}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="mt-1 text-sm font-medium leading-snug">{p.label}</div>
              </button>
            ))}
          </div>

          {/* Preview card */}
          <Card
            key={active}
            className="explore-fade flex-1 bg-background border-border overflow-hidden rounded-2xl"
          >
            {/* Image area */}
            <div className="relative w-full aspect-video bg-[#0e0e0e] overflow-hidden">
              {/* Sky-toned glow */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.07) 0%, transparent 70%)"
                }}
              />
              {/* Browser chrome */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#161616] border-b border-white/5 flex items-center px-4 gap-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="flex-1 max-w-xs mx-4">
                  <div className="bg-white/5 border border-white/8 rounded-md h-5 flex items-center px-3 gap-1.5">
                    <span className="w-2 h-2 rounded-full border border-sky-400/60 inline-block shrink-0" />
                    <span className="text-[10px] text-muted-foreground truncate">
                      neura.explore / {current.label.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <img
                src={current.image}
                alt={current.label}
                className="w-full h-full object-cover object-top"
                style={{ marginTop: "2rem" }}
              />
            </div>

            {/* Info bar */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-300">
                    {current.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{current.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
              </div>

              {/* Dot navigation */}
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap max-w-[120px] justify-end">
                {previews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300
                      ${active === i
                        ? "w-5 h-1.5 bg-sky-400"
                        : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  )
}
