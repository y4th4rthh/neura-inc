"use client"

import { useState } from "react"

import type React from "react"
import axios from "axios"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("https://formspree.io/f/xvgdoego", {
        name,
        email,
        message,
      })

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("Failed to send message. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h2>
              <p className="text-muted-foreground text-center">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-ring"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-ring"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-ring resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-3 text-2xl">💬</div>
            <h3 className="mb-2 font-semibold text-foreground">Quick Response</h3>
            <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-3 text-2xl">🔒</div>
            <h3 className="mb-2 font-semibold text-foreground">Secure</h3>
            <p className="text-sm text-muted-foreground">Your information is safe and encrypted</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="mb-2 font-semibold text-foreground">Always Available</h3>
            <p className="text-sm text-muted-foreground">Contact us anytime, any day</p>
          </div>
        </div>
      </main>

    </div>
  )
}



