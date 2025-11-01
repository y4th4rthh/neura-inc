"use client"

import { Card } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: "🔒",
      title: "Secure Chat Sessions",
      description: "Share your conversations securely with encrypted session links",
    },
    {
      icon: "🎨",
      title: "AI Studio",
      description: "Create custom GPTs tailored to your specific needs",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance for instant responses",
    },
    {
      icon: "🌐",
      title: "Hybrid Mode",
      description: "Live search integration for real-time information",
    },
    {
      icon: "📱",
      title: "Multi-Platform",
      description: "Available on Windows, Mac, Android, and web",
    },
    {
      icon: "🤖",
      title: "Advanced AI",
      description: "Powered by state-of-the-art language models",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need for advanced AI interactions</p>
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
