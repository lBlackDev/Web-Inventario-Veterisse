import React from 'react'
import { CategoryForm } from "@/components/categories/CategoryForm"

interface EditCategoryProps {
  params: Promise<{ categoryId: string }>
}

export default async function EditCategory({
  params
}: EditCategoryProps) {
  const { categoryId } = await params

  // Convertir la categoría al formato esperado por el formulario

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Categoría</h1>
        <p className="text-muted-foreground">Modifica la información de la categoría {categoryId}</p>
      </div>

      <CategoryForm isEditing />
    </div>
  )
}
