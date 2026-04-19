"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Zap} from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {

   const [link, setLink] = useState("");
  const [label, setLabel] = useState("Download App");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const base =
      "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/";

    if (ua.includes("win")) {
      setLink(base + "neura.ai.exe");
      setLabel("Download for Windows");
    } 
    
    else if (ua.includes("linux")) {

      if (ua.includes("fedora") || ua.includes("rhel") || ua.includes("centos")) {
        setLink(base + "neura.ai.rpm");
        setLabel("Download Linux (.rpm)");
      } 
      
      else if (ua.includes("ubuntu") || ua.includes("debian")) {
        setLink(base + "neura.ai.deb");
        setLabel("Download Linux (.deb)");
      } 
      
      else {
        setLink(base + "neura.ai.AppImage");
        setLabel("Download for Linux");
      }

    } 
    
    else {
      setLink(base + "neura.ai.apk");
      setLabel("Download (.apk)");
    }
  }, []);

  
  return (
    <section className="relative py-18 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#ff8c42] rounded-[18px]">
            <span ><Zap size={36}/></span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">Neura AI</h1>

          <p className="text-base md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Experience powerful AI tools designed for productivity. Chat, summarize, analyze, and create with
            cutting-edge AI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button  onClick={() => (window.location.href = "https://neura-ai.netlify.app/")}  size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Launch Platform
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
              <Link href={link}>{label}</Link>
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
