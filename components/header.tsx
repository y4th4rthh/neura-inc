"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import {Zap} from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 p-2 bg-primary rounded-lg flex items-center justify-center">
            <Zap/>
          </div>
         <span
  style={{
    WebkitTextFillColor: 'transparent',
    background: 'linear-gradient(135deg, #fff, #ff6b00)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  }}
>
  Neura.ai
</span>

        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Platform
          </Link>
          <Link href="/explore" className="text-foreground hover:text-primary transition">
            Explore
          </Link>
          <Link href="#features" className="text-foreground hover:text-primary transition">
            Features
          </Link>
          <Link href="#tools" className="text-foreground hover:text-primary transition">
            Tools
          </Link>
          <Link href="/demo" className="text-foreground hover:text-primary transition">
            Try it?
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button  onClick={() => (window.location.href = "https://neura-ai.netlify.app/")} className="bg-primary hover:bg-primary/90">Get Started</Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-4">
          <Link href="/" className="block text-foreground hover:text-primary">
            Platform
          </Link>
          <Link href="/explore" className="block text-foreground hover:text-primary">
            Explore
          </Link>
          <Link href="#features" className="block text-foreground hover:text-primary">
            Features
          </Link>
          <Link href="#tools" className="block text-foreground hover:text-primary">
            Tools
          </Link>
          <Link href="/demo" className="text-foreground hover:text-primary transition">
            Try it?
          </Link>
         
        </div>
      )}
    </header>
  )
}
