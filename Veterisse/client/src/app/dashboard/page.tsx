"use client"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { InventorySummary } from "@/components/dashboard/InventorySumary"
import { RecentMovements } from "@/components/dashboard/RecentMovements"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { useAxios } from "@/hooks/useAxios"
import { getProducts } from "@/api/products"


export default function DashboardPage() {
  const { data: products, loading } = getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      {/* TODO LOADING: Preparar mejor loading */}
      {loading && <p>Loading...</p>}
      <StatsCards products={products}/>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventorySummary products={products} />
        <QuickActions />
      </div>

      <RecentMovements />
    </div>
  )
}