"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import type { JSX } from "react/jsx-runtime"

interface Release {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  assets: {
    id: number
    name: string
    download_count: number
    browser_download_url: string
  }[]
  prerelease: boolean
  draft: boolean
}

const assetIcon = (name: string) => {
  const cls = "w-5 h-5 inline-block align-middle"

  if (name.endsWith(".exe")) return <img src="/logo/exe.png" className={"w-4 h-4 inline-block align-middle"} />
  if (name.endsWith(".dmg") || name.endsWith(".pkg")) return <img src="/logo/exe.png" className={"w-4 h-4 inline-block align-middle"} />
  if (name.endsWith(".deb")) return <img src="/logo/deb.png" className={cls} />
  if (name.endsWith(".rpm")) return <img src="/logo/rpm.png" className={cls} />
  if (name.endsWith(".AppImage")) return <img src="/logo/linux.png" className={cls} />
  if (name.endsWith(".apk")) return <img src="/logo/apk.png" className={"w-6 h-6 inline-block align-middle"} />
  if (name.endsWith(".aab")) return <img src="/logo/aab.png" className={"w-6 h-6 inline-block align-middle"} />
  if (name.endsWith(".zip") || name.endsWith(".tar.gz")) return <img src="/logo/exe.png" className={cls} />
  return <img src="/logo/msi.png" className={"w-5 h-5 inline-block align-middle"} />
}

export default function ChangelogsPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch("/api/releases")
        if (!response.ok) throw new Error(`Failed to fetch releases: ${response.statusText}`)
        const data = await response.json()
        setReleases(data)
        if (data.length > 0) setExpanded(data[0].id)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load releases")
      } finally {
        setIsLoading(false)
      }
    }
    fetchReleases()
  }, [])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const isLessThan = (v: any, target: any): boolean => {
    const normalize = (s: any) =>
      s.replace(/^v/i, "").split(".").map((x: any) => Number(x))
    const a = normalize(v)
    const b = normalize(target)
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const diff = (a[i] || 0) - (b[i] || 0)
      if (diff !== 0) return diff < 0
    }
    return false
  }

  const renderInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g
    let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index))
      if (match[1]) parts.push(<strong key={match.index} className="font-semibold text-foreground">{match[1]}</strong>)
      else if (match[2]) parts.push(<em key={match.index} className="italic">{match[2]}</em>)
      else if (match[3]) parts.push(<code key={match.index} className="bg-white/8 px-1.5 py-0.5 rounded text-xs font-mono text-orange-300">{match[3]}</code>)
      else if (match[4] && match[5]) parts.push(<a key={match.index} href={match[5]} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">{match[4]}</a>)
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) parts.push(text.substring(lastIndex))
    return parts.length > 0 ? parts : text
  }

  const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: JSX.Element[] = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let trimmed = line.trim()
      if (trimmed.startsWith("<blockquote>")) {
        const content = trimmed.replace(/<\/?[^>]+(>|$)/g, "").trim()
        if (content) elements.push(
          <div key={i} className="border-l-2 border-yellow-500/60 pl-3 py-1.5 bg-yellow-500/8 rounded-r-lg text-sm text-muted-foreground mb-2">
            {renderInlineMarkdown(content)}
          </div>
        )
        continue
      }
      trimmed = trimmed.replace(/<\/?[^>]+(>|$)/g, "").trim()
      if (!trimmed || trimmed === "---") {
        elements.push(<div key={`e-${i}`} className="mb-1" />)
        continue
      }
      if (!trimmed) { elements.push(<div key={`e-${i}`} className="mb-1" />); continue }
      if (trimmed.startsWith("##")) {
        elements.push(<h3 key={i} className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mt-5 mb-2 flex items-center gap-2">
          <span className="h-px flex-1 bg-white/8" />
          {trimmed.replace(/^#+\s+/, "")}
          <span className="h-px flex-1 bg-white/8" />
        </h3>)
      } else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        elements.push(<li key={i} className="text-sm text-muted-foreground ml-2 mb-1.5 flex items-start gap-2">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 shrink-0" />
          <span>{renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</span>
        </li>)
      } else if (/^\d+\./.test(trimmed)) {
        elements.push(<li key={i} className="text-sm text-muted-foreground ml-2 mb-1.5 list-decimal list-inside">
          {renderInlineMarkdown(trimmed.replace(/^\d+\.\s+/, ""))}
        </li>)
      } else if (trimmed.startsWith("```")) {
        const codeLines = []
        i++
        while (i < lines.length && !lines[i].trim().startsWith("```")) { codeLines.push(lines[i]); i++ }
        elements.push(<pre key={i} className="bg-white/5 border border-white/8 p-3 rounded-xl overflow-x-auto mb-3 text-xs">
          <code className="text-orange-300/80 font-mono">{codeLines.join("\n")}</code>
        </pre>)
      } else {
        elements.push(<p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
          {renderInlineMarkdown(trimmed)}
        </p>)
      }
    }
    return elements
  }

  return (
    <div className="min-h-screen flex">

      <div className="flex-1 flex flex-col relative bg-[#121212] rounded-xl overflow-hidden transition-[margin,border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }
          .release-card { transition: border-color 0.2s, box-shadow 0.2s; }
          .release-card:hover { border-color: rgba(255,255,255,0.12); }
          .release-card.active { border-color: rgba(249,115,22,0.25); box-shadow: 0 0 0 1px rgba(249,115,22,0.1); }
        `}</style>

        <div className="overflow-scroll hide-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

          <div className="mx-auto text-center max-w-4xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground mb-5 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              Changelogs
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-foreground mb-3">Changelog Cycle</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Track all releases, updates, and improvements to Neura.ai
            </p>
          </div>

          <main className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 fade-up">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
                </div>
                <p className="text-sm text-muted-foreground">Loading releases…</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 fade-up">
                <p className="text-red-400 font-medium">{error}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Make sure the GitHub API route is correctly configured.
                </p>
              </div>
            )}

            {!isLoading && !error && releases.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-12 text-center fade-up">
                <p className="text-muted-foreground">No releases found.</p>
              </div>
            )}

            {!isLoading && !error && releases.length > 0 && (
              <div className="relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/6 hidden sm:block" />

                <div className="space-y-4">
                  {releases.map((release, index) => {
                    const deprecated = isLessThan(release.tag_name, "v10.4")
                    const isOpen = expanded === release.id

                    return (
                      <div
                        key={release.id}
                        className="fade-up sm:pl-10 relative"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className={`absolute left-0 top-5 w-[23px] h-[23px] rounded-full border-2 items-center justify-center hidden sm:flex
                          ${deprecated
                            ? "border-red-500/40 bg-red-500/10"
                            : release.prerelease
                              ? "border-white/20 bg-white/5"
                              : "border-orange-500/60 bg-orange-500/10"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full
                            ${deprecated ? "bg-red-500/60" : release.prerelease ? "bg-white/30" : "bg-orange-400"}
                          `} />
                        </div>

                        <div
                          className={`release-card rounded-2xl border border-border bg-[#161616] overflow-hidden cursor-pointer ${isOpen ? "active" : ""}`}
                          onClick={() => setExpanded(isOpen ? null : release.id)}
                        >
                          <div className="px-6 py-5 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span className="text-lg font-bold text-foreground truncate">
                                  {release.name || release.tag_name}
                                </span>
                                {deprecated ? (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400">
                                    Deprecated
                                  </span>
                                ) : release.prerelease ? (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/15 bg-white/5 text-muted-foreground">
                                    Pre-release
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300">
                                    Release
                                  </span>
                                )}
                                {index === 0 && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-500/40 bg-green-500/10 text-green-300 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse inline-block" />
                                    Latest
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <code className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 font-mono">
                                  {release.tag_name}
                                </code>
                                <span>·</span>
                                <span>{formatDate(release.published_at)}</span>
                              </div>
                            </div>

                            <div className={`shrink-0 mt-1 w-7 h-7 rounded-lg border border-white/8 bg-white/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
                              </svg>
                            </div>
                          </div>

                          {isOpen && (
                            <div onClick={(e) => e.stopPropagation()}>
                              <div className="h-px bg-white/6 mx-6" />

                              <div className="px-6 py-5">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                  Release Notes
                                </p>
                                <div className="mb-6">
                                  {release.body
                                    ? parseMarkdown(release.body)
                                    : <p className="text-sm text-muted-foreground italic">No description provided.</p>
                                  }
                                </div>

                                {release.assets.length > 0 && (
                                  <>
                                    <div className="h-px bg-white/6 mb-5" />
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                      Downloads
                                    </p>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                      {release.assets.map((asset) => (
                                        <Link
                                          key={asset.id}
                                          href={asset.browser_download_url}
                                          rel="noopener noreferrer"
                                          className="group flex items-center justify-between rounded-xl border border-border bg-white/3 hover:bg-white/6 hover:border-white/15 p-3.5 transition-all"
                                        >
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <span className="text-xl shrink-0">{assetIcon(asset.name)}</span>
                                            <div className="min-w-0">
                                              <p className="text-sm font-medium text-foreground truncate group-hover:text-orange-300 transition-colors">
                                                {asset.name}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {asset.download_count.toLocaleString()} downloads
                                              </p>
                                            </div>
                                          </div>
                                          <div className="shrink-0 ml-3 w-7 h-7 rounded-lg border border-white/8 bg-white/5 group-hover:border-orange-500/30 group-hover:bg-orange-500/8 flex items-center justify-center transition-all">
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                              <path d="M5.5 1v6M2.5 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-orange-400 transition-colors" />
                                              <path d="M1 9.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground group-hover:text-orange-400 transition-colors" />
                                            </svg>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}
