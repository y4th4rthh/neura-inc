"use client"

import { Button } from "@/components/ui/button"
import {Atom} from "lucide-react"
import { useEffect, useState } from "react"

export default function ExploreHero() {

   const [link, setLink] = useState("")
  const [label, setLabel] = useState("")

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const base =
      "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/";
    
    if (ua.includes("linux")) {

      if (ua.includes("fedora") || ua.includes("rhel") || ua.includes("centos")) {
        setLink(base + "neura.explore.rpm");
        setLabel("Download (.rpm)");
      } 
      
      else if (ua.includes("ubuntu") || ua.includes("debian")) {
        setLink(base + "neura.explore.deb");
        setLabel("Download (.deb)");
      } 
      
      else {
        setLink(base + "neura.explore.AppImage");
        setLabel("Download (AppImage)");
      }

    } 
    
    else {
      setLink(base + "neura.explore.AppImage");
      setLabel("Download");
    }
  }, [])
  
  return (
    <section className="relative py-18 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#ff8c42] rounded-[18px]">
            <span className="text-6xl"><Atom size={36}/></span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">Neura Explore</h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The AI-integrated browser that brings Neura.ai tools directly into your browsing experience. Faster,
            smarter, better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.explore.exe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Download for Windows
              </Button>
            </a>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {label}
              </Button>
            </a>
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
