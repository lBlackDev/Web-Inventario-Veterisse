import type { Metadata } from "next"
import { SupplierForm } from "@/components/suppliers/SupplierForm"

export const metadata: Metadata = {
  title: "Nuevo Proveedor | Sistema de Inventario",
  description: "Añadir un nuevo proveedor al sistema de inventario",
}

export default function NewSupplierPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Proveedor</h1>
        <p className="text-muted-foreground">Añade un nuevo proveedor para tus productos.</p>
      </div>

      <SupplierForm />
    </div>
  )
}
