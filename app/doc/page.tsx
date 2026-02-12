"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { JSX } from "react/jsx-runtime"

interface DocumentFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  content: string
  isEditable: boolean
}

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [selectedDoc, setSelectedDoc] = useState<DocumentFile | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editableFormats = [
    "text/plain",
    "application/json",
    "application/x-yaml",
    "text/html",
    "text/css",
    "text/javascript",
    "application/xml",
    "text/markdown",
    "text/csv",
  ]

  const supportedFormats = [
    ...editableFormats,
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ]

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setError(null)
    setIsLoading(true)
    const newDocuments: DocumentFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!supportedFormats.includes(file.type) && !isSupportedByExtension(file.name)) {
        setError(`File "${file.name}" is not a supported format`)
        continue
      }

      const url = URL.createObjectURL(file)
      const isEditable = editableFormats.includes(file.type) || isEditableByExtension(file.name)
      let content = ""

      if (isEditable && file.type === "text/plain") {
        const text = await file.text()
        content = text
      } else if (isEditable && (file.type === "application/json" || file.name.endsWith(".json"))) {
        const text = await file.text()
        content = text
      } else if (isEditable && file.type.includes("text")) {
        const text = await file.text()
        content = text
      }

      newDocuments.push({
        id: `${file.name}-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type || getMimeTypeByExtension(file.name),
        url: url,
        content: content,
        isEditable: isEditable,
      })
    }

    setDocuments((prev) => [...prev, ...newDocuments])
    setIsLoading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isSupportedByExtension = (filename: string): boolean => {
    const ext = filename.split(".").pop()?.toLowerCase()
    const supportedExts = ["txt", "json", "yaml", "yml", "html", "css", "js", "xml", "md", "csv", "pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg", "gif", "webp", "svg"]
    return supportedExts.includes(ext || "")
  }

  const isEditableByExtension = (filename: string): boolean => {
    const ext = filename.split(".").pop()?.toLowerCase()
    const editableExts = ["txt", "json", "yaml", "yml", "html", "css", "js", "xml", "md", "csv"]
    return editableExts.includes(ext || "")
  }

  const getMimeTypeByExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      txt: "text/plain",
      json: "application/json",
      yaml: "application/x-yaml",
      yml: "application/x-yaml",
      html: "text/html",
      css: "text/css",
      js: "text/javascript",
      xml: "application/xml",
      md: "text/markdown",
      csv: "text/csv",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
    }
    return mimeTypes[ext || ""] || "application/octet-stream"
  }

  const handleSelectDocument = (doc: DocumentFile) => {
    setSelectedDoc(doc)
    setEditMode(false)
    setEditContent(doc.content)
  }

  const handleEditToggle = () => {
    if (editMode) {
      setEditContent(selectedDoc?.content || "")
    }
    setEditMode(!editMode)
  }

  const handleSaveEdit = () => {
    if (selectedDoc) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDoc.id ? { ...doc, content: editContent } : doc,
        ),
      )
      setSelectedDoc((prev) =>
        prev ? { ...prev, content: editContent } : null,
      )
      setEditMode(false)
    }
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => {
      const doc = prev.find((d) => d.id === id)
      if (doc) {
        URL.revokeObjectURL(doc.url)
      }
      if (selectedDoc?.id === id) {
        setSelectedDoc(null)
      }
      return prev.filter((d) => d.id !== id)
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const renderDocumentContent = (doc: DocumentFile) => {
    // Handle images
    if (doc.type.startsWith("image/")) {
      return (
        <div className="w-full flex justify-center">
          <img
            src={doc.url}
            alt={doc.name}
            className="max-w-full max-h-96 rounded-lg"
          />
        </div>
      )
    }

    // Handle text/code files
    if (doc.isEditable || doc.type.startsWith("text/")) {
      if (editMode && doc.isEditable) {
        return (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-96 p-4 bg-muted border border-border rounded-lg font-mono text-sm text-foreground resize-vertical focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )
      }
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs text-muted-foreground font-mono leading-relaxed">
          <code>{doc.content || "No content available"}</code>
        </pre>
      )
    }

    // Handle PDF
    if (doc.type === "application/pdf") {
      return (
        <div className="w-full h-96 border border-border rounded-lg overflow-hidden bg-black">
          <iframe
            src={doc.url}
            className="w-full h-full"
            title={doc.name}
          />
        </div>
      )
    }

    // Handle Word documents
    if (
      doc.type === "application/msword" ||
      doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div className="w-full h-96 border border-border rounded-lg overflow-hidden bg-white">
          <iframe
            src={`https://docs.google.com/gvfs/render?url=${encodeURIComponent(doc.url)}`}
            className="w-full h-full"
            title={doc.name}
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      )
    }

    // Handle Excel
    if (
      doc.type === "application/vnd.ms-excel" ||
      doc.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <div className="w-full h-96 border border-border rounded-lg overflow-hidden bg-white">
          <iframe
            src={`https://docs.google.com/gvfs/render?url=${encodeURIComponent(doc.url)}`}
            className="w-full h-full"
            title={doc.name}
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      )
    }

    // Default fallback
    return (
      <div className="p-4 bg-muted rounded-lg text-center">
        <p className="text-muted-foreground">Preview not available for this file type</p>
        <p className="text-xs text-muted-foreground mt-2">{doc.type}</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] scrollbar-hide"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#444 #1a1a1a",
      }}
    >
      {/* Header */}
      <header>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">Document Viewer</h1>
          </div>
          <p className="text-muted-foreground">Upload and view your documents in the browser</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <Card className="mb-8 bg-[#121212]">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Supported formats: TXT, JSON, YAML, HTML, CSS, JS, XML, Markdown, CSV, PDF, DOC, DOCX, XLS, XLSX, and Images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  Loading...
                </>
              ) : (
                "Choose Documents"
              )}
            </Button>
            {error && <p className="text-destructive text-sm mt-3">{error}</p>}
          </CardContent>
        </Card>

        {documents.length === 0 ? (
          <Card className="bg-[#121212]">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No documents uploaded. Upload a document to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Document List */}
            <div className="lg:col-span-1">
              <Card className="bg-[#121212] sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">Documents ({documents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleSelectDocument(doc)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedDoc?.id === doc.id
                            ? "bg-primary/20 border-primary"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                          {doc.isEditable && (
                            <Badge variant="outline" className="text-xs">
                              Editable
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Viewer */}
            <div className="lg:col-span-3">
              {selectedDoc ? (
                <div className="space-y-4">
                  <Card className="bg-[#121212]">
                    <CardContent className="pt-6">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                          <Spinner className="h-8 w-8 mb-4" />
                          <p className="text-muted-foreground">Loading document...</p>
                        </div>
                      ) : (
                        renderDocumentContent(selectedDoc)
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-[#121212]">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle>{selectedDoc.name}</CardTitle>
                          <CardDescription className="mt-2">
                            <div className="flex flex-wrap gap-4">
                              <span>Size: {formatFileSize(selectedDoc.size)}</span>
                              <span>Type: {selectedDoc.type}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {selectedDoc.isEditable && (
                            <>
                              {editMode ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={handleSaveEdit}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleEditToggle}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleEditToggle}
                                >
                                  Edit
                                </Button>
                              )}
                            </>
                          )}
                          <Button
                            className = "bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200"
                            size="sm"
                            onClick={() => removeDocument(selectedDoc.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ) : (
                <Card className="bg-[#121212]">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">Select a document from the list to view</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )

}
