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

export default function ChangelogsPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch("/api/releases")

        if (!response.ok) {
          throw new Error(`Failed to fetch releases: ${response.statusText}`)
        }

        const data = await response.json()
        setReleases(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load releases")
        console.error("[v0] Error fetching releases:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: JSX.Element[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()

      if (!trimmed) {
        elements.push(<div key={`empty-${i}`} className="mb-2" />)
        continue
      }

      // Handle headings
      if (trimmed.startsWith("##")) {
        const heading = trimmed.replace(/^#+\s+/, "")
        elements.push(
          <h3 key={i} className="text-lg font-semibold text-foreground mt-4 mb-2">
            {heading}
          </h3>,
        )
      }
      // Handle unordered lists
      else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const listItem = trimmed.replace(/^[-*]\s+/, "")
        elements.push(
          <li key={i} className="text-sm text-muted-foreground ml-4 mb-1">
            {renderInlineMarkdown(listItem)}
          </li>,
        )
      }
      // Handle ordered lists
      else if (/^\d+\./.test(trimmed)) {
        const listItem = trimmed.replace(/^\d+\.\s+/, "")
        elements.push(
          <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-decimal list-inside">
            {renderInlineMarkdown(listItem)}
          </li>,
        )
      }
      // Handle code blocks
      else if (trimmed.startsWith("```")) {
        const codeLines = []
        i++
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i])
          i++
        }
        elements.push(
          <pre key={i} className="bg-muted p-3 rounded-lg overflow-x-auto mb-3 text-xs">
            <code className="text-muted-foreground">{codeLines.join("\n")}</code>
          </pre>,
        )
      }
      // Handle inline code
      else if (trimmed.includes("`")) {
        elements.push(
          <p key={i} className="text-sm text-muted-foreground mb-2">
            {renderInlineMarkdown(trimmed)}
          </p>,
        )
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
            {renderInlineMarkdown(trimmed)}
          </p>,
        )
      }
    }

    return elements
  }

  const renderInlineMarkdown = (text: string) => {
    const parts = []
    let lastIndex = 0

    // Handle bold, italic, links, and inline code
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]$$(.+?)$$/g
    let match

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      // Add matched element
      if (match[1]) {
        // Bold
        parts.push(
          <strong key={`bold-${match.index}`} className="font-semibold text-foreground">
            {match[1]}
          </strong>,
        )
      } else if (match[2]) {
        // Italic
        parts.push(
          <em key={`italic-${match.index}`} className="italic">
            {match[2]}
          </em>,
        )
      } else if (match[3]) {
        // Inline code
        parts.push(
          <code
            key={`code-${match.index}`}
            className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-muted-foreground"
          >
            {match[3]}
          </code>,
        )
      } else if (match[4] && match[5]) {
        // Link
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {match[4]}
          </a>,
        )
      }

      lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="mt-4">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">Changelogs</h1>
          </div>
          <p className="text-muted-foreground">Track all releases, updates, and improvements to Neura.ai</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner className="h-8 w-8 mb-4" />
            <p className="text-muted-foreground">Loading releases...</p>
          </div>
        ) : error ? (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Make sure to replace 'owner/repo' with your GitHub repository URL in the code.
              </p>
            </CardContent>
          </Card>
        ) : releases.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No releases found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {releases.map((release, index) => (
              <div key={release.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl">{release.name || release.tag_name}</CardTitle>
                          <Badge variant={release.prerelease ? "secondary" : "default"}>
                            {release.prerelease ? "Pre-release" : "Release"}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          <code className="px-2 py-1 rounded bg-muted text-muted-foreground">{release.tag_name}</code>
                          <span className="ml-3">{formatDate(release.published_at)}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <Separator />

                  <CardContent className="pt-6">
                    {/* Release Description */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3">Release Notes</h3>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {release.body ? (
                          parseMarkdown(release.body)
                        ) : (
                          <p className="text-muted-foreground italic">No description provided</p>
                        )}
                      </div>
                    </div>

                    {/* Assets/Downloads */}
                    {release.assets.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Downloads</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {release.assets.map((asset) => (
                            <Link
                              key={asset.id}
                              href={asset.browser_download_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between rounded-lg border border-border bg-card p-3 hover:bg-muted transition-colors group"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-lg">📦</span>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                                    {asset.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{asset.download_count} downloads</p>
                                </div>
                              </div>
                              <span className="text-lg ml-2">↓</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {index < releases.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="h-px w-24 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
