import Link from "next/link"
import { BarChart3, ClipboardList, Package, ShoppingCart, Truck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Definición de acciones rápidas
// TODOs: Quitar y implementar conexion a la API para obtener los datos de las acciones rápidas
const quickActions = [
  {
    title: "Nuevo Producto",
    description: "Agregar un producto al inventario",
    icon: Package,
    href: "/dashboard/products/new",
    color: "bg-blue-500",
  },
  {
    title: "Nueva Venta",
    description: "Registrar una nueva venta",
    icon: ShoppingCart,
    href: "/dashboard/inventory/sell",
    color: "bg-green-500",
  },
  {
    title: "Nueva Compra",
    description: "Registrar una compra a proveedor",
    icon: Truck,
    href: "/dashboard/inventory/buy",
    color: "bg-purple-500",
  },
  {
    title: "Nuevo Cliente",
    description: "Agregar un nuevo cliente",
    icon: Users,
    href: "/dashboard/customers/new",
    color: "bg-amber-500",
  },
  {
    title: "Nuevo Movimiento",
    description: "Registrar movimiento de inventario",
    icon: ClipboardList,
    href: "/dashboard/movements/new",
    color: "bg-rose-500",
  },
  {
    title: "Generar Reporte",
    description: "Crear un nuevo reporte",
    icon: BarChart3,
    href: "/dashboard/reports/new",
    color: "bg-indigo-500",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accesos directos a las funciones más utilizadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="flex h-auto flex-col items-center justify-center gap-2 p-4 text-center"
              asChild
            >
              <Link href={action.href}>
                <div className={`rounded-full p-2 ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="font-medium">{action.title}</div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
