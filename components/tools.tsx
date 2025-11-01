"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Tools() {
  const tools = [
    {
      name: "neura.essence1.o",
      icon: "✨",
      description: "General chat communication",
      modes: ["Hybrid Mode (Live Search)", "Stack Overflow Mode"],
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      name: "neura.swift1.o",
      icon: "⚡",
      description: "Fast and powerful chat",
      modes: ["Hybrid Mode (Live Search)", "Stack Overflow Mode", "Voice Recognition"],
      color: "from-orange-500/20 to-red-600/20",
    },
    {
      name: "neura.vista1.o",
      icon: "👁️",
      description: "Content summarization",
      modes: ["Reddit Query Summarization"],
      color: "from-purple-500/20 to-pink-600/20",
    },
    {
      name: "neura.infinity1.o",
      icon: "∞",
      description: "Document insights",
      modes: ["Document Analysis", "Content Summarization"],
      color: "from-cyan-500/20 to-blue-600/20",
    },
  ]

  return (
    <section id="tools" className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI Models</h2>
          <p className="text-lg text-muted-foreground">Choose the perfect AI model for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, idx) => (
            <Card
              key={idx}
              className="p-8 bg-background border-border hover:border-primary/50 transition overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-50 pointer-events-none`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-5xl mb-3">{tool.icon}</div>
                    <h3 className="text-2xl font-bold text-foreground">{tool.name}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                <div className="space-y-2 mb-6">
                  {tool.modes.map((mode, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {mode}
                    </div>
                  ))}
                </div>
                <Button  onClick={() => (window.location.href = "https://neura-ai.netlify.app/")}  className="w-full bg-primary hover:bg-primary/90">Try {tool.name}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
