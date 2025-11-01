import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neura.ai - Advanced AI Platform",
  description:
    "Neura.ai: Powerful AI tools for chat, content summarization, document insights, and more. Experience the future of AI.",
  generator: "Neura Engine",
   icons: {
    icon: "/logo.ico", // Path in /public
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
