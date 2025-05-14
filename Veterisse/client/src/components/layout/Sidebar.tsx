"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  Building2,
  ClipboardList,
  DollarSign,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Definición de los elementos del menú
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Productos",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    title: "Categorías",
    icon: Tag,
    href: "/dashboard/categories",
  },
  {
    title: "Inventario",
    icon: Box,
    href: "/dashboard/inventory",
  },
  
  {
    title: "Proveedores",
    icon: Building2,
    href: "/dashboard/suppliers",
  },
  {
    title: "Reportes",
    icon: BarChart3,
    href: "/dashboard/reports",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span className="text-lg">Inventario</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <span className="font-medium">US</span>
          </div>
          <div>
            <p className="font-medium">Usuario Demo</p>
            <p className="text-xs text-muted-foreground">usuario@ejemplo.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
