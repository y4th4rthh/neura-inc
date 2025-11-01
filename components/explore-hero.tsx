"use client"

import { Button } from "@/components/ui/button"
import {Globe} from "lucide-react"

export default function ExploreHero() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
            <span className="text-6xl"><Globe/></span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">Neura Explore</h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The AI-integrated browser that brings Neura.ai tools directly into your browsing experience. Faster,
            smarter, better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="https://github.com/y4th4rthh/neura.ai-releases/releases/download/v10.7/neura.explore.exe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Download for Windows
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
              Learn More
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">AI Tools</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">1-Click</div>
              <p className="text-sm text-muted-foreground">Access</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">Sidebar</div>
              <p className="text-sm text-muted-foreground">Integration</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">Fast</div>
              <p className="text-sm text-muted-foreground">Browsing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
