"use client"
import { useEffect, useState } from "react"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { InventorySummary } from "@/components/dashboard/InventorySumary"
import { RecentMovements } from "@/components/dashboard/RecentMovements"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { ProductosType } from "@/type"
import { getProducts } from "@/api"


export default function DashboardPage() {
  const [products, setProducts] = useState<ProductosType[]>([])

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <StatsCards products={products}/>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventorySummary products={products} />
        <QuickActions />
      </div>

      <RecentMovements />
    </div>
  )
}