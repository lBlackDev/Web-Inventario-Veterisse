import type { Metadata } from "next"
import { FileDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LowStockReportTable } from "@/components/reports/LowStockReportTable"

export const metadata: Metadata = {
  title: "Reporte de Bajo Stock | Sistema de Inventario",
  description: "Productos con nivel de stock por debajo del mínimo",
}

export default function LowStockReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporte de Bajo Stock</h1>
          <p className="text-muted-foreground">Productos que requieren reabastecimiento inmediato.</p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar producto..." className="w-full max-w-sm pl-8" />
      </div>

      <LowStockReportTable />
    </div>
  )
}
