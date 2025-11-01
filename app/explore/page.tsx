"use client"

import Header from "@/components/header"
import ExploreHero from "@/components/explore-hero"
import ExploreFeatures from "@/components/explore-features"
import Footer from "@/components/footer"

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ExploreHero />
      <ExploreFeatures />
      <Footer />
    </main>
  )
}
