import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovementTable } from "@/components/inventory/movement-table"
import { MovementFilters } from "@/components/inventory/movement-filters"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Inventario | Sistema de Inventario",
  description: "Gestión de movimientos de inventario",
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Movimientos de Inventario</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Movimiento
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/inventory/buy">
                <ArrowDown className="mr-2 h-4 w-4 text-rose-500" />
                Entrada de Stock
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/inventory/sell">
                <ArrowUp className="mr-2 h-4 w-4 text-emerald-500" />
                Salida de Stock
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <MovementFilters />
      <MovementTable />
    </div>
  )
}
