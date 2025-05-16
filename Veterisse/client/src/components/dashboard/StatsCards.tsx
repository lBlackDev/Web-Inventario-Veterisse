import { ArrowDownIcon, ArrowUpIcon, DollarSign, Package, ShoppingCart, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ProductsProps } from "@/type"

interface StatsCardsProps extends ProductsProps {
}

export function StatsCards({products}: StatsCardsProps) {

  // Verificar si products es un array y no está vacío
  const [valueInventory, productsTotal] = products 
  // Cuando llegan los productos hacer esta accion
  ? products.reduce((acc, product) => {
    acc[0] += product.price * product.stock; // Calculate inventory value
    acc[1] += 1; // Count total products
    return acc;
  }, [0, 0])
  : [0, 0]

  console.log(products)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(valueInventory)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              {/* TODO Implementar: Historial */}
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +20.1%
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productos Totales</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productsTotal}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              {/* TODO Implementar: Historial */}
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +180
            </span>{" "}
            nuevos productos este mes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* TODO implementar: Funcionalidad de ventas del mes */}
          <div className="text-2xl font-bold">{formatCurrency(12234.00)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              -4.5%
            </span>{" "}
            comparado con el mes anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* TODO implementar: Funcionalidad de Ordenes */}
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +3
            </span>{" "}
            órdenes nuevas hoy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
