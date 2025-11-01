"use client"

import { Card } from "@/components/ui/card"

export default function ExploreFeatures() {
  const features = [
    {
      icon: "⚡",
      title: "Integrated Sidebar",
      description: "Access all Neura.ai tools directly from your browser sidebar for seamless workflow",
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Hybrid mode with live search capabilities built into your browser",
    },
    {
      icon: "📄",
      title: "Content Analysis",
      description: "Summarize and analyze web content on the fly with neura.vista1.o",
    },
    {
      icon: "💬",
      title: "Quick Chat",
      description: "Chat with AI models without leaving your current page",
    },
    {
      icon: "🎯",
      title: "Stack Overflow Mode",
      description: "Get instant answers to coding questions while browsing",
    },
    {
      icon: "🚀",
      title: "Lightning Performance",
      description: "Optimized for speed with minimal resource usage",
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Browser Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need for an AI-powered browsing experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 bg-background border-border hover:border-primary/50 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
