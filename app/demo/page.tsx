"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading completion after iframe starts
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
       <Header />

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">Experience AI at Lightning Speed</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Chat with Neura.ai - ultra-fast conversations powered by cutting-edge AI
          </p>
        </div>

        {/* Embedded Tool Container */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-orange-500" />
                <p className="text-sm text-muted-foreground">Loading Neura.ai...</p>
              </div>
            </div>
          )}

          {/* Webview Iframe */}
          <iframe
            src="https://dev-neura-ai.netlify.app"
            title="Neura.ai Chat Interface"
            className="h-[800px] w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Features Below */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="mb-2 font-semibold text-foreground">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Experience ultra-fast AI conversations with minimal latency</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-2xl">🤖</div>
            <h3 className="mb-2 font-semibold text-foreground">Advanced AI</h3>
            <p className="text-sm text-muted-foreground">Powered by cutting-edge language models and neural networks</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-2xl">🎯</div>
            <h3 className="mb-2 font-semibold text-foreground">Precise Responses</h3>
            <p className="text-sm text-muted-foreground">Get accurate, contextual answers tailored to your needs</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

