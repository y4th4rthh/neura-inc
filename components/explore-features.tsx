"use client"

import { Card } from "@/components/ui/card"

export default function ExploreFeatures() {
  const features = [
    {
      icon: "🌐",
      title: "Hybrid Search Engine",
      description: "A dual-layer architecture blending traditional web indexing with real-time AI synthesis for instant, accurate answers.",
    },
    {
      icon: "🛡️",
      title: "Native Ad-Blocking",
      description: "Engineered-in privacy that strips ads from YouTube and News sites at the engine level for a distraction-free web.",
    },
    {
      icon: "🧠",
      title: "Neura Vista 1.0",
      description: "Advanced on-the-fly content analysis. Summarize complex articles or long-form videos without leaving your tab.",
    },
    {
      icon: "⚡",
      title: "Integrated AI Panel",
      description: "A persistent sidebar housing powerful LLMs, enabling seamless multi-tasking and deep-page interaction.",
    },
    {
      icon: "🕵️",
      title: "Persistent Ghost Mode",
      description: "A Ghost Mode feature that provides hybrid incognito approach - Keeps you logged in at various sites but leave no trace.",
    },
    {
      icon: "🚀",
      title: "Native Internal Pages",
      description: "A standalone native pages built for high performance and minimal overhead.",
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
