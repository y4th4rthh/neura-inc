"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Tools from "@/components/tools"
import Downloads from "@/components/downloads"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Tools />
      <Downloads />
      <Footer />
    </main>
  )
}
