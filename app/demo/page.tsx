"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [link, setLink] = useState("")
  const [label, setLabel] = useState("")

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const base = "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/"

    if (ua.includes("win")) {
      setLink(base + "neura.ai.exe")
      setLabel("Download for Windows")
    } else if (ua.includes("linux")) {
      if (ua.includes("fedora") || ua.includes("rhel") || ua.includes("centos")) {
        setLink(base + "neura.ai.rpm")
        setLabel("Download (.rpm)")
      } else if (ua.includes("ubuntu") || ua.includes("debian")) {
        setLink(base + "neura.ai.deb")
        setLabel("Download (.deb)")
      } else {
        setLink(base + "neura.ai.AppImage")
        setLabel("Download (.AppImage)")
      }
    } else {
      setLink(base + "neura.ai.apk")
      setLabel("Download (.apk)")
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <Header />

      <div className="flex-1 flex flex-col h-[calc(100vh-16px)] relative m-2 bg-[#121212] rounded-xl border border-white/10 overflow-hidden transition-[margin,border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          @keyframes pulse-ring {
            0%   { transform: scale(0.95); opacity: 0.6; }
            50%  { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.6; }
          }
          @keyframes shimmer-bar {
            0%   { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .shimmer-bar {
            background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
            background-size: 200% 100%;
            animation: shimmer-bar 1.6s infinite;
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        `}</style>

        <div
          className="overflow-scroll hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <main className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="mb-10 text-center fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                Live Demo
              </div>
              <h2 className="md:text-4xl text-2xl font-bold text-foreground">
                Experience AI at Lightning Speed
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Chat with Neura.ai — ultra-fast conversations powered by cutting-edge AI
              </p>
            </div>

            <div className="gap-3 flex flex-col sm:flex-row justify-center pb-10 fade-up" style={{ animationDelay: "0.08s" }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {label}
                </Button>
              </a>
              <a href="https://neura-ai.netlify.app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
                  Visit Neura.ai
                </Button>
              </a>
            </div>

            <div
              className="fade-up overflow-hidden rounded-2xl border border-border bg-[#0e0e0e] shadow-2xl"
              style={{ animationDelay: "0.14s" }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-48 z-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 flex items-center gap-2 px-4 h-10 bg-[#161616] border-b border-white/5">
      
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />

            
                <div className="flex-1 flex justify-center px-4">
                  <div className="w-full max-w-sm bg-white/5 border border-white/8 rounded-md h-6 flex items-center gap-2 px-3">
            
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate">
                      demo-neura-ai.netlify.app
                    </span>
                  </div>
                </div>

            
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300 shrink-0">
                  Demo
                </span>
              </div>

            
              <div className="relative">
         
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0e0e0e] gap-5">
              
                    <div className="relative h-14 w-14">
                      <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
                    </div>
           
                    <div className="flex flex-col gap-2 w-48">
                      <div className="shimmer-bar h-2 rounded-full w-full" />
                      <div className="shimmer-bar h-2 rounded-full w-3/4 mx-auto" />
                      <div className="shimmer-bar h-2 rounded-full w-1/2 mx-auto" />
                    </div>
                    <p className="text-xs text-muted-foreground tracking-wide">Loading Neura.ai…</p>
                  </div>
                )}

                <iframe
                  src="https://demo-neura-ai.netlify.app"
                  title="Neura.ai Chat Interface"
                  className="h-[800px] w-full border-0 block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              <div className="flex items-center justify-end px-5 py-3 border-t border-white/5 bg-[#161616]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                   <a
                  href="https://neura-ai.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-muted-foreground hover:scale-110 transition-colors"
                >
                  Visit Neura.ai ↗
                </a>
                </div>
               
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3 fade-up" style={{ animationDelay: "0.2s" }}>
              {[
                { icon: "⚡", title: "Lightning Fast", desc: "Experience ultra-fast AI conversations with minimal latency" },
                { icon: "🤖", title: "Advanced AI", desc: "Powered by cutting-edge language models and neural networks" },
                { icon: "🎯", title: "Precise Responses", desc: "Get accurate, contextual answers tailored to your needs" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-6 hover:border-white/20 transition-colors"
                >
                  <div className="mb-3 text-2xl">{f.icon}</div>
                  <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}
