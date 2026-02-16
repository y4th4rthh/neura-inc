"use client"

import Header from "@/components/header"
import ExploreHero from "@/components/explore-hero"
import ExploreFeatures from "@/components/explore-features"
import Footer from "@/components/footer"

export default function ExplorePage() {
  return (
    <main className="min-h-screen flex bg-[#0a0a0a]">
      <Header />
       <div className="flex-1 flex flex-col h-[calc(100vh-16px)] relative m-2  bg-[#121212] rounded-xl border border-white/10 overflow-hidden transition-[margin,border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
         <style>
    {`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>
        <div className="overflow-scroll hide-scrollbar"
         style={{
    scrollbarWidth: 'none',     // Firefox
    msOverflowStyle: 'none'     // IE/Edge legacy
  }}
        >
      <ExploreHero />
      <ExploreFeatures />
      <Footer />
      </div>
      </div>
    </main>
  )
}
