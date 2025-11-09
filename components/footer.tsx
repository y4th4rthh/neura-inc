"use client"

import Link from "next/link"
import {Zap} from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
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

            </div>
            <p className="text-sm text-muted-foreground">Advanced AI platform for productivity and innovation</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-primary transition">
                  Explore Browser
                </Link>
              </li>
              <li>
                <a href="#tools" className="hover:text-primary transition">
                  AI Models
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/y4th4rthh/neura.ai-releases" className="hover:text-primary transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://react.dev/" className="hover:text-primary transition">
                  API Reference
                </a>
              </li>
              <li>
                <a href="https://github.com/y4th4rthh/neura.ai-releases/releases" className="hover:text-primary transition">
                  Release Notes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.mongodb.com/products" className="hover:text-primary transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://github.com/y4th4rthh/neura.ai-releases" className="hover:text-primary transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="https://github.com/y4th4rthh/neura.ai-releases" className="hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Neura.ai. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/y4th4rthh/neura.ai-releases" className="hover:text-primary transition">
              GitHub
            </a>
            <a href="https://neura-ai.netlify.app/" className="hover:text-primary transition">
              Neura.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
