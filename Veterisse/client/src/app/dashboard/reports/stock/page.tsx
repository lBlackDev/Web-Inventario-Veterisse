import type { Metadata } from "next"
import { FileDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StockReportTable } from "@/components/reports/stock-report-table"
import { StockReportFilters } from "@/components/reports/stock-report-filters"

export const metadata: Metadata = {
  title: "Reporte de Stock | Sistema de Inventario",
  description: "Reporte detallado del stock actual de productos",
}

export default function StockReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporte de Stock Actual</h1>
          <p className="text-muted-foreground">Visualiza el estado actual de tu inventario.</p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar producto..." className="w-full pl-8" />
        </div>
        <StockReportFilters />
      </div>

      <StockReportTable />
    </div>
  )
}
