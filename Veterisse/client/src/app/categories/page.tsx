"use client"
// import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryTable } from "@/components/categories/CategoryTable"
import { getCategories } from "@/api/category"

export default function CategoriesPage() {
  const categories = getCategories()

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
