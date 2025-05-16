import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Package, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { getMovement } from "@/api/inventory"
import { MovementsProps } from "@/type"

export function RecentMovements() {
  const [movements, setMovements] = useState<MovementsProps["movements"]>([])

  const recentMovements = movements ? movements.slice(0, 5) : []

  useEffect(() => {
    getMovement()
      .then((res) => {
       setMovements(res)
      })
      .catch((err) => {
       console.log(err)
      })
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Movimientos Recientes</CardTitle>
          <CardDescription>Últimos movimientos de inventario registrados</CardDescription>
        </div>
        <Link href="/inventory" className="ml-auto">
          <Button type="button" variant="outline" size="sm" className="ml-auto">
            <FileText className="mr-2 h-4 w-4" />
            Ver todos
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMovements.map((movement) => (
            <div key={movement.id} className="flex items-start gap-4">
              <div
                className={`rounded-full p-2 ${
                  movement.type === "entrada"
                    ? "bg-emerald-100 text-emerald-700"
                    : movement.type === "salida"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {movement.type === "entrada" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : movement.type === "salida" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <Package className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{movement.description}</p>
                  <Badge
                    className="min-w-17"
                    variant={
                      movement.type === "entrada" ? "success" : movement.type === "salida" ? "destructive" : "outline"
                    }
                  >
                    {movement.type === "entrada" ? "Entrada" : movement.type === "salida" ? "Salida" : "Ajuste"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Ref: {movement.reference}</span>
                  <span className="mx-2">•</span>
                  <span>Cantidad: {movement.quantity}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Productos: {movement.products.join(", ")}</span>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(movement.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
