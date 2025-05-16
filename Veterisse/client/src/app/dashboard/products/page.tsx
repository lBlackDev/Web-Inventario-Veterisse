"use client"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductTable } from "@/components/products/ProductTable"
import { ProductFilters } from "@/components/products/ProductFilters"
import { useEffect, useState } from "react"
import { ProductsProps } from "@/type"
import { getProducts } from "@/api/products"

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsProps["products"]>([])
  const [filteredProducts, setFilteredProducts] = useState<string>("")

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handleSearch = (searchTerm: string) => {
    setFilteredProducts(searchTerm)
  }

  const categories = ["Todos", ...new Set(products.map((product) => product.category))]
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Producto
          </Link>
        </Button>
      </div>

      <ProductFilters categories={categories} handleSearch={handleSearch}/>
      <ProductTable products={products} filteredProducts={filteredProducts}/>
    </div>
  )
}
