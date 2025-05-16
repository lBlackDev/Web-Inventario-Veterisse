"use client"
import { use } from "react"
import { notFound } from "next/navigation"
import { CategoryForm } from "@/components/categories/CategoryForm"
import { CategoriesType, CategoryProps } from "@/type"
import { useEffect, useState } from "react"
import { getCategories } from "@/api/category"

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<CategoriesType | undefined>(undefined)
  const categoryId = use(Promise.resolve(params)).id

  useEffect(() => {
    getCategories()
      .then((res:CategoryProps['categories']) => {
        if (!res) {
          notFound()
        }
        const categoryFinder = res.find((category) => category.category === params.id)
        console.log(categoryFinder)
        if (!categoryFinder) {
          notFound()
        }

        setCategory(categoryFinder)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [categoryId])

  // Convertir la categoría al formato esperado por el formulario
  const categoryData = {
    name: category?.category || "",
    description: "",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Categoría</h1>
        <p className="text-muted-foreground">Modifica la información de la categoría {category?.category}</p>
      </div>

      <CategoryForm initialData={categoryData} isEditing />
    </div>
  )
}
