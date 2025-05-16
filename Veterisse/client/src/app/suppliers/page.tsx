import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SupplierTable } from "@/components/suppliers/SupplierTable"

export const metadata: Metadata = {
  title: "Proveedores | Sistema de Inventario",
  description: "Gestión de proveedores del sistema de inventario",
}

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
        <Button asChild>
          <Link href="/suppliers/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proveedor
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <SupplierTable />
      </div>
    </div>
  )
}
