"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, Plus, Search, Trash2, LogOut, Globe, HelpCircle, Atom, Sparkles } from "lucide-react"
import {
  LayoutDashboard,
  Compass,
  ScrollText,
  Activity,
  PlayCircle,
  Mail
} from "lucide-react";

import { useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) 

  const navLinks = [
    { href: "/", label: "Platform", icon: Zap, title: "Neura.ai"},
    { href: "/explore", label: "Explore", icon: Atom ,title: "Neura.explore"},
    { href: "/changelogs", label: "Changelogs", icon: ScrollText,title: "Changelogs" },
    // { href: "/status", label: "Neura Status", icon: Activity,title: "Neura Status" },
    { href: "/demo", label: "Try it?", icon: HelpCircle,title: "Demo?" },
    { href: "/contact-us", label: "Contact Us", icon: Mail,title: "Neura Support" },
  ];

  const navCollapseLinks = [
    { href: "/", label: "Platform", icon: Zap, title: "Neura.ai"},
    { href: "/explore", label: "Explore", icon: Atom ,title: "Neura.explore"},
    { href: "/changelogs", label: "Changelogs", icon: ScrollText,title: "Changelogs" },
    // { href: "/status", label: "Neura Status", icon: Activity,title: "Neura Status" },
    { href: "/demo", label: "Try it?", icon: HelpCircle,title: "Demo?" },
    { href: "/contact-us", label: "Contact Us", icon: Mail,title: "Neura Support" },
  ];

  const navSmCollapseLinks = [
    { href: "/", label: "Platform", icon: Zap, title: "Neura.ai"},
    { href: "/explore", label: "Explore", icon: Atom ,title: "Neura.explore"},
    { href: "/changelogs", label: "Changelogs", icon: ScrollText,title: "Changelogs" },
    // { href: "/status", label: "Neura Status", icon: Activity,title: "Neura Status" },
    // { href: "/demo", label: "Try it?", icon: HelpCircle,title: "Demo?" },
    { href: "/contact-us", label: "Contact Us", icon: Mail,title: "Neura Support" },
  ];


  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleNewChatClick = () => {
   
    console.log("New chat clicked")
  }

  const handleNavigationClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  const clearHistory = () => {
    console.log("History cleared")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsOpen(false)
  }

  return (
    <div
      id="collSidebar"
      className={` side-container overflow-x-hidden h-dvh top-0 ${isOpen && "fixed md:relative"
        } left-0 z-30 lg:z-0
  ${isOpen
          ? "w-72"
          : "w-[50px] md:w-[60px] opacity-100"
        }
  flex flex-col md:transition-[width] md:transition transition-none duration-300 ease-in-out  bg-[#121212] border-r border-white/10`}
    >
      {!isOpen ? (
        <div
          id="sidebar-area"
          className="[-webkit-app-region:no-drag] h-full pt-[38px] pb-4 px-5 flex flex-col justify-between items-center gap-3"
        >
          <div className="px-5 h-full">
            <div className="flex items-center flex-col justify-between gap-6 text-sm font-semibold text-white/80 mb-4 pb-2 h-full">
              <div className="flex flex-col items-center gap-6">

                <button
                  onClick={toggleSidebar}
                  className="hidden md:sidebar-toggle pb-4 text-white/70 hover:text-white cursor-pointer transition-colors"
                  title="Open sidebar"
                >
                  <Menu size={20} />
                </button>

                 <button
                  onClick={toggleSidebar}
                  className="sidebar-toggle md:hidden pb-4 text-white/70 hover:text-white cursor-pointer transition-colors"
                  title="Open sidebar"
                >
                  <Menu size={18} />
                </button>

                <nav className="hidden md:flex flex-col gap-5">
                  {navCollapseLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleNavigationClick}
                        title={link.title}
                        className="group relative flex items-center gap-2 p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                      >
                        <Icon size={18} />

                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8c42] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    );
                  })}
                </nav>

                 <nav className="flex md:hidden flex-col gap-5">
                  {navSmCollapseLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleNavigationClick}
                        title={link.title}
                        className="group relative flex items-center gap-2 p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                      >
                        <Icon size={16} />

                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8c42] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    );
                  })}
                </nav>



              </div>

              <Button
                onClick={() => {
                  window.location.href = "https://neura-ai.netlify.app/"
                }}
                title="Get started"
                className="w-full py-2 px-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 hidden md:flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />

              </Button>
              <Button
                onClick={() => {
                  window.location.href = "https://neura-ai.netlify.app/"
                }}
                title="Get started"
                className="w-fit py-1 px-1 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 flex md:hidden items-center justify-center gap-2"
              >
                <Sparkles size={14} />

              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            id="sidebar-area"
            className="[-webkit-app-region:no-drag] pt-[34px] pb-3 px-5 flex flex-col min-w-70 items-left gap-6"
          >
            <div className="flex justify-between gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 font-bold text-xl group z-10 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="w-8 h-8 p-1 bg-gradient-to-br from-[#ff6b00] to-[#ff8c42] rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-xl font-semibold bg-gradient-to-r from-white via-white to-[#ff6b00] bg-clip-text text-transparent inline-block"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Neura.ai
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 bg-transparent cursor-pointer [-webkit-app-region:no-drag] border border-white/10 rounded-md text-white/60 hover:bg-white/5 hover:text-white transition-all duration-200 flex items-center justify-center"
                title="Close sidebar"
              >
                <X size={20} className="[-webkit-app-region:no-drag]" />
              </button>
              
            </div>

           <nav className="hidden md:flex flex-col gap-5">
                  {navCollapseLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleNavigationClick}
                        title={link.title}
                        className="group relative flex items-center gap-4 p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                      >
                        <Icon size={18} /> {link.label}

                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8c42] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    );
                  })}
                </nav>

            <nav className="flex md:hidden flex-col gap-5">
                  {navSmCollapseLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleNavigationClick}
                        title={link.title}
                        className="group relative flex items-center gap-4 p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                      >
                        <Icon size={18} /> {link.label}

                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8c42] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    );
                  })}
                </nav>

            <div className="mt-4 pt-4 border-t border-white/10">
              <Button
                onClick={() => {
                  window.location.href = "https://neura-ai.netlify.app/"
                }}
                className="w-full py-2 px-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                <span className="relative z-10">Get Started</span>

              </Button>
            </div>


          </div>
        </>
      )}
    </div>
  )
}
