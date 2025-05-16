import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, FileDown, FileText, Package, ShoppingCart, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Reportes | Sistema de Inventario",
  description: "Generación de reportes del sistema de inventario",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">Genera reportes para analizar tu inventario y movimientos.</p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar Reportes
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <Link href="/dashboard/reports/low-stock" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Bajo Stock</CardTitle>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[40px]">
                Productos con stock por debajo del nivel mínimo que requieren reabastecimiento.
              </CardDescription>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <FileText className="mr-1 h-4 w-4" />
                <span>Alerta de inventario</span>
              </div>
            </CardContent>
          </Card>
        </Link>


      </div>
    </div>
  )
}
