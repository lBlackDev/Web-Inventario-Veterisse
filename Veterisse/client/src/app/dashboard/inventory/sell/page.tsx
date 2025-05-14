import type { Metadata } from "next"
import { ExitForm } from "@/components/inventory/exit-form"

export const metadata: Metadata = {
  title: "Salida de Stock | Sistema de Inventario",
  description: "Registrar una nueva salida de stock en el inventario",
}

export default function ExitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Salida de Stock</h1>
        <p className="text-muted-foreground">Registra una nueva salida de productos del inventario.</p>
      </div>

      <ExitForm />
    </div>
  )
}
