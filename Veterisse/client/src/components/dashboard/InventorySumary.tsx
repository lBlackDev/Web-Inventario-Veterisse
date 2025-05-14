import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ProductosProps } from "@/type"

// Datos de ejemplo para productos con bajo stock

interface InventorySumaryProps extends ProductosProps {
}

// TODO Implementar: stock de productos 
export function InventorySummary({products}: InventorySumaryProps) {

  const lowStockProducts = products.filter((product) => product.stock < 10)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Productos con Bajo Stock</CardTitle>
          <CardDescription>Productos que necesitan reabastecimiento pronto</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{lowStockProducts.length} productos</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="grid gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Stock mínimo: 10</span>
                  </div>
                </div>
                <div className="font-medium">{product.stock} unidades</div>
              </div>
              <Progress
                value={(product.stock / 10) * 100}
                className="h-2 "
                // TODO: Cambiar el color del indicador según el stock
                indicatorClassName={
                  product.stock < 10 * 0.3
                    ? "bg-destructive"
                    : product.stock < 10 * 0.6
                      ? "bg-amber-500"
                      : "bg-amber-400"
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
