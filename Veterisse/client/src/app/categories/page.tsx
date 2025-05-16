"use client"
// import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryTable } from "@/components/categories/CategoryTable"
import { useEffect, useState } from "react"
import { getCategories } from "@/api/category"
import type { CategoriesType } from "@/type"

// export const metadata: Metadata = {
//   title: "Categorías | Sistema de Inventario",
//   description: "Gestión de categorías de productos",
// }



export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoriesType[]>([])

  useEffect(() => {
    getCategories()
      .then((res) => {
       setCategories(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
        <Button asChild>
          <Link href="/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <CategoryTable categories={categories}/>
      </div>
    </div>
  )
}
