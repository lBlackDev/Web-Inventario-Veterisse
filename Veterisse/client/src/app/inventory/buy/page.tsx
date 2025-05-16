import type { Metadata } from "next"
import { EntryForm } from "@/components/inventory/EntryForm"

export const metadata: Metadata = {
  title: "Entrada de Stock | Sistema de Inventario",
  description: "Registrar una nueva entrada de stock en el inventario",
}

export default function EntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Entrada de Stock</h1>
        <p className="text-muted-foreground">Registra una nueva entrada de productos al inventario.</p>
      </div>

      <EntryForm />
    </div>
  )
}
