"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"

const previews = [
  {
    id: 1,
    label: "neura.essence.1.o",
    tag: "Core Chat",
    description: "Intelligent conversation with context-aware responses and seamless session management.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-1.png",
  },
  {
    id: 2,
    label: "neura.essence.1.o",
    tag: "Prompt Tools",
    description: "Advanced prompt generation toolkit to craft precise, high-quality AI instructions.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-2.png",
  },
  {
    id: 3,
    label: "neura.vista.1.o",
    tag: "Vision",
    description: "Web/Reddit Content Summarizer to get analysis, summary, and tldrs about posts and content.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-3.png",
  },
  {
    id: 4,
    label: "neura.swift.1.o",
    tag: "Swift",
    description: "Blazing-fast response mode optimized for high-throughput tasks and rapid iteration.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-4.png",
  },
  {
    id: 5,
    label: "neura.swift.1.o",
    tag: "Hybrid AI",
    description: "Live web search fused with AI reasoning for real-time, grounded answers.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-5.png",
  },
  {
    id: 6,
    label: "neura.infinity.1.o",
    tag: "Doc Upload",
    description: "Upload PDFs, docs, and files — ask anything about your documents instantly.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-6.png",
  },
  {
    id: 7,
    label: "neura.infinity.1.o",
    tag: "Snap Analyzer",
    description: "Upload docs and get instant answers. Ask questions, extract insights, and share results in real-time.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-6.png",
  },
  {
    id: 8,
    label: "AI Studio",
    tag: "Custom GPTs",
    description: "Build, configure, and deploy your own specialized AI agents from scratch.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-7.png",
  },
  {
    id: 9,
    label: "Chat Sessions",
    tag: "Sidebar Insights",
    description: "Rich session history with sidebar analytics, context tracking, and smart insights.",
    image: "https://raw.githubusercontent.com/y4th4rthh/neura.ai-releases/main/public/nai-8.png",
  },
]

export default function Outlook() {
  const [active, setActive] = useState(0)
  const current = previews[active]

  return (
    <section id="outlook" className="py-20 md:py-32 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .preview-fade {
          animation: fadeIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .tab-btn {
          position: relative;
          transition: color 0.2s, background 0.2s;
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: transparent;
          transition: background 0.2s;
          border-radius: 2px;
        }
        .tab-btn.active::after {
          background: #a78bfa;
        }
        .img-shimmer {
          background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="container mx-auto max-w-6xl">

       
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground mb-4 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
            Product Outlook
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4">See It In Action</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A live preview of every tool inside Neura.ai — crafted for speed, depth, and clarity.
          </p>
        </div>

    
        <div className="flex flex-col lg:flex-row gap-6 items-start">

       
          <div className="lg:w-64 w-full flex lg:flex-col flex-row lg:overflow-visible overflow-x-auto gap-2 shrink-0 pb-1 hide-scrollbar">
            {previews.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`tab-btn text-left px-4 py-3 rounded-xl border transition-all whitespace-nowrap lg:whitespace-normal
                  ${active === i
                    ? "bg-white/8 border-white/15 text-foreground"
                    : "bg-transparent border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border
                      ${active === i
                        ? "border-orange-500/50 bg-orange-500/15 text-orange-300"
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

        
          <Card
            key={active}
            className="preview-fade flex-1 bg-background border-border overflow-hidden rounded-2xl"
          >
      
            <div className="relative w-full aspect-video bg-[#0e0e0e] overflow-hidden">
           
              <div className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)"
                }}
              />
            
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#161616] border-b border-white/5 flex items-center px-4 gap-2 z-20">
                <div className="mx-auto flex-1 max-w-xs mx-4">
                  <div className="bg-white/5 border border-white/8 rounded-md h-5 flex gap-2 items-center px-3">
                    <span className="w-2 h-2 rounded-full border border-orange-400/60 inline-block shrink-0" />
                    <span className="text-[10px] text-muted-foreground truncate">neura.ai / {current.label.toLowerCase().replace(/\s+/g, "-")}</span>
                  </div>
                </div>
              </div>
           
              <div className="absolute inset-0 top-8">
             <img src={current.image} alt={current.label} className="w-full h-full object-cover object-top" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = "none"; }} />
                
                 </div>
            </div>

      
            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300">
                    {current.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{current.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
              </div>
              <div className="hidden items-center gap-1.5 shrink-0">
                {previews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300
                      ${active === i
                        ? "w-5 h-1.5 bg-orange-400"
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
