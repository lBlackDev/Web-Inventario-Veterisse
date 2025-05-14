import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryForm } from "@/components/categories/category-form"

// Datos de ejemplo para categorías
const categories = [
  {
    id: "1",
    name: "Electrónicos",
    description: "Productos electrónicos como laptops, tablets y smartphones",
  },
  {
    id: "2",
    name: "Periféricos",
    description: "Accesorios para computadoras como teclados, mouse y monitores",
  },
  {
    id: "3",
    name: "Componentes",
    description: "Componentes internos para computadoras como discos duros, memorias y procesadores",
  },
  {
    id: "4",
    name: "Accesorios",
    description: "Accesorios varios como cables, adaptadores y fundas",
  },
  {
    id: "5",
    name: "Oficina",
    description: "Productos para oficina como impresoras, escáneres y proyectores",
  },
]

export const metadata: Metadata = {
  title: "Editar Categoría | Sistema de Inventario",
  description: "Modificar una categoría existente",
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((c) => c.id === params.id)

  if (!category) {
    notFound()
  }

  // Convertir la categoría al formato esperado por el formulario
  const categoryData = {
    name: category.name,
    description: category.description || "",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Categoría</h1>
        <p className="text-muted-foreground">Modifica la información de la categoría {category.name}</p>
      </div>

      <CategoryForm initialData={categoryData} isEditing />
    </div>
  )
}
