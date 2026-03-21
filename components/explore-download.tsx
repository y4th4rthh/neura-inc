"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DownloadExplore() {
  const downloads = [
    {
      name: "Neura.ai Platform",
      description: "Full-featured AI platform with all tools",
      icon: "💻",
      items: [
        {
          label: "Windows (.exe)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.ai.exe",
        },
        {
          label: "Android (.apk)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.ai.apk",
        },
         {
          label: "Linux (.deb)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.ai.deb",
        },
         {
          label: "Linux (.rpm)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.ai.rpm",
        },
         {
          label: "Linux (.AppImage)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.ai.AppImage",
        },
      ],
    },
    {
      name: "Neura.explore Browser",
      description: "AI Native Browser with Adblocker",
      icon: "🌐",
      items: [
        {
          label: "Windows (.exe)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.explore.exe",
        },
        {
          label: "Linux (.deb)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.explore.deb",
        },
         {
          label: "Linux (.rpm)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.explore.rpm",
        },
         {
          label: "Linux (.AppImage)",
          url: "https://github.com/y4th4rthh/neura.ai-releases/releases/latest/download/neura.explore.AppImage",
        },
      ],
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Download & Access</h2>
          <p className="text-lg text-muted-foreground">Get Neura.ai & Neura.explore on your preferred platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {downloads.map((download, idx) => (
            <Card key={idx} className="p-8 bg-background border-border">
              <div className="text-5xl mb-4">{download.icon}</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{download.name}</h3>
              <p className="text-muted-foreground mb-6">{download.description}</p>
              <div className="space-y-3">
                {download.items.map((item, iIdx) => (
                  <a key={iIdx} href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
