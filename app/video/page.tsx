"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { JSX } from "react/jsx-runtime"

interface VideoFile {
    id: string
    name: string
    size: number
    type: string
    url: string
}

export default function VideoPage() {
    const [videos, setVideos] = useState<VideoFile[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const supportedFormats = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/3gpp", "video/3gpp2", "video/mpeg"]

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        setError(null)
        const newVideos: VideoFile[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            if (!supportedFormats.includes(file.type)) {
                setError(`File "${file.name}" is not a supported video format`)
                continue
            }

            const url = URL.createObjectURL(file)
            newVideos.push({
                id: `${file.name}-${Date.now()}-${i}`,
                name: file.name,
                size: file.size,
                type: file.type,
                url: url,
            })
        }

        setVideos((prev) => [...prev, ...newVideos])

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const removeVideo = (id: string) => {
        setVideos((prev) => {
            const video = prev.find((v) => v.id === id)
            if (video) {
                URL.revokeObjectURL(video.url)
            }
            if (selectedVideo?.id === id) {
                setSelectedVideo(null)
            }
            return prev.filter((v) => v.id !== id)
        })
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
    }

    const getVideoThumbnail = (videoUrl: string) => {
        return videoUrl
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
                        <h1 className="text-2xl font-bold text-foreground">Video Player</h1>
                    </div>
                    <p className="text-muted-foreground">Upload and play your local video files in the browser</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Upload Section */}
                <Card className="mb-8 bg-[#121212]">
                    <CardHeader>
                        <CardTitle>Upload Videos</CardTitle>
                        <CardDescription>Supported formats: MP4, WebM, OGG, MOV, AVI, WMV, 3GP</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Choose Videos
                        </Button>
                        {error && <p className="text-destructive text-sm mt-3">{error}</p>}
                    </CardContent>
                </Card>

                {videos.length === 0 ? (
                    <Card className="bg-[#121212]">
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground">No videos uploaded. Upload a video to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Playlist */}
                        <div className="lg:col-span-1">
                            <Card className="bg-[#121212] sticky top-6">
                                <CardHeader>
                                    <CardTitle className="text-lg">Playlist ({videos.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {videos.map((video) => (
                                            <div
                                                key={video.id}
                                                onClick={() => setSelectedVideo(video)}
                                                className={`p-3 rounded-lg cursor-pointer transition-colors border ${selectedVideo?.id === video.id
                                                        ? "bg-primary/20 border-primary"
                                                        : "border-border hover:bg-muted/50"
                                                    }`}
                                            >
                                                <p className="text-sm font-medium text-foreground truncate">{video.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{formatFileSize(video.size)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Player */}
                        <div className="lg:col-span-3">
                            {selectedVideo ? (
                                <div className="space-y-4">
                                    <Card className="bg-[#121212]">
                                        <CardContent className="pt-6">
                                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                                <video
                                                    key={selectedVideo.id}
                                                    controls
                                                    autoPlay
                                                    className="w-full h-full"
                                                    controlsList="nodownload"
                                                >
                                                    <source src={selectedVideo.url} type={selectedVideo.type} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-[#121212]">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle>{selectedVideo.name}</CardTitle>
                                                    <CardDescription className="mt-2">
                                                        <div className="flex flex-wrap gap-4">
                                                            <span>Size: {formatFileSize(selectedVideo.size)}</span>
                                                            <span>Format: {selectedVideo.type.split("/")[1].toUpperCase()}</span>
                                                        </div>
                                                    </CardDescription>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeVideo(selectedVideo.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </div>
                            ) : (
                                <Card className="bg-[#121212]">
                                    <CardContent className="pt-6 text-center">
                                        <p className="text-muted-foreground">Select a video from the playlist to start playing</p>
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