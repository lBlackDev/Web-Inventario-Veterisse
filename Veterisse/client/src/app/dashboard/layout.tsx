import type React from "react"
import { AppSidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
