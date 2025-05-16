import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { AppSidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { SidebarProvider } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Inventario",
  description: "Sistema de gestión de inventario y ventas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {/* TODOs: Implementacion de toggle de tema*/}
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SidebarProvider>
              <div className="flex min-h-screen w-screen">
                <AppSidebar />
                <div className="flex flex-1 flex-col">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}