import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductDetails } from "@/components/products/ProductDetails"

// Datos de ejemplo para productos
const products = [
  {
    id: "1",
    code: "PROD-001",
    name: "Laptop HP Pavilion",
    description: "Laptop HP Pavilion 15.6 pulgadas, 8GB RAM, 512GB SSD",
    category: "Electrónicos",
    stock: 15,
    minStock: 5,
    price: 899.99,
    costPrice: 750.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "HP Inc.",
    taxable: true,
    active: true,
    createdAt: "2023-01-15T10:30:00",
    updatedAt: "2023-04-20T14:45:00",
  },
  // Otros productos...
]

export const metadata: Metadata = {
  title: "Detalles del Producto | Sistema de Inventario",
  description: "Información detallada del producto",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-muted-foreground">Código: {product.code}</p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/products/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Producto
          </Link>
        </Button>
      </div>

      <ProductDetails product={product} />
    </div>
  )
}
