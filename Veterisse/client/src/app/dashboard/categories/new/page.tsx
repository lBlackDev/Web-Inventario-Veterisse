import type { Metadata } from "next"
import { CategoryForm } from "@/components/categories/category-form"

export const metadata: Metadata = {
  title: "Nueva Categoría | Sistema de Inventario",
  description: "Crear una nueva categoría de productos",
}

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nueva Categoría</h1>
        <p className="text-muted-foreground">Crea una nueva categoría para organizar tus productos.</p>
      </div>

      <CategoryForm />
    </div>
  )
}
