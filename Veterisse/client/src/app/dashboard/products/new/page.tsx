import type { Metadata } from "next"
import { ProductForm } from "@/components/products/product-form"

export const metadata: Metadata = {
  title: "Nuevo Producto | Sistema de Inventario",
  description: "Añadir un nuevo producto al sistema de inventario",
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Producto</h1>
        <p className="text-muted-foreground">Completa el formulario para añadir un nuevo producto al inventario.</p>
      </div>

      <ProductForm />
    </div>
  )
}
