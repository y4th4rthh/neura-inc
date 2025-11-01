"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Zap} from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
            <span ><Zap/></span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">The Future of AI is Here</h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience powerful AI tools designed for productivity. Chat, summarize, analyze, and create with
            cutting-edge AI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button  onClick={() => (window.location.href = "https://neura-ai.netlify.app/")}  size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Launch Platform
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
              <Link href="/explore">Explore Browser</Link>
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">AI Models</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
              <p className="text-sm text-muted-foreground">Possibilities</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
