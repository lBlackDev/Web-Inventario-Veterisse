import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/products/product-form"

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
  },
  // Otros productos...
]

export const metadata: Metadata = {
  title: "Editar Producto | Sistema de Inventario",
  description: "Modificar información de un producto existente",
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Convertir el producto al formato esperado por el formulario
  const productData = {
    code: product.code,
    name: product.name,
    description: product.description || "",
    category: product.category,
    unit: product.unit,
    initialStock: product.stock,
    minStock: product.minStock,
    costPrice: product.costPrice,
    price: product.price,
    supplier: product.supplier || "",
    location: product.location || "",
    taxable: product.taxable,
    active: product.active,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
        <p className="text-muted-foreground">Modifica la información del producto {product.name}</p>
      </div>

      <ProductForm initialData={productData} isEditing />
    </div>
  )
}
