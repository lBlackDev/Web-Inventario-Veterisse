import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductTable } from "@/components/products/product-table"
import { ProductFilters } from "@/components/products/product-filters"

export const metadata: Metadata = {
  title: "Productos | Sistema de Inventario",
  description: "Gestión de productos del sistema de inventario",
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Producto
          </Link>
        </Button>
      </div>

      <ProductFilters />
      <ProductTable />
    </div>
  )
}
