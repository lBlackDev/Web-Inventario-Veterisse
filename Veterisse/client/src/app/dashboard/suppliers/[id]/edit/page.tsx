import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SupplierForm } from "@/components/suppliers/supplier-form"

// Datos de ejemplo para proveedores
const suppliers = [
  {
    id: "1",
    name: "HP Inc.",
    contactName: "Carlos Rodríguez",
    address: "Av. Principal 123, Ciudad Tecnológica",
    phone: "+1 (555) 123-4567",
    email: "ventas@hp-example.com",
    notes: "Proveedor principal de laptops y equipos de cómputo.",
  },
  {
    id: "2",
    name: "Dell Technologies",
    contactName: "María González",
    address: "Calle Innovación 456, Parque Industrial",
    phone: "+1 (555) 234-5678",
    email: "ventas@dell-example.com",
    notes: "Proveedor de servidores y equipos empresariales.",
  },
  {
    id: "3",
    name: "Logitech",
    contactName: "Juan Pérez",
    address: "Blvd. Periférico 789, Zona Comercial",
    phone: "+1 (555) 345-6789",
    email: "distribuidores@logitech-example.com",
    notes: "Proveedor de periféricos y accesorios.",
  },
  {
    id: "4",
    name: "Samsung",
    contactName: "Ana Martínez",
    address: "Plaza Central 234, Distrito Financiero",
    phone: "+1 (555) 456-7890",
    email: "ventas@samsung-example.com",
    notes: "Proveedor de monitores y dispositivos móviles.",
  },
  {
    id: "5",
    name: "Corsair",
    contactName: "Roberto Sánchez",
    address: "Av. Tecnología 567, Parque Empresarial",
    phone: "+1 (555) 567-8901",
    email: "distribuidores@corsair-example.com",
    notes: "Proveedor de componentes y periféricos gaming.",
  },
]

export const metadata: Metadata = {
  title: "Editar Proveedor | Sistema de Inventario",
  description: "Modificar información de un proveedor existente",
}

export default function EditSupplierPage({ params }: { params: { id: string } }) {
  const supplier = suppliers.find((s) => s.id === params.id)

  if (!supplier) {
    notFound()
  }

  // Convertir el proveedor al formato esperado por el formulario
  const supplierData = {
    name: supplier.name,
    contactName: supplier.contactName,
    address: supplier.address || "",
    phone: supplier.phone || "",
    email: supplier.email || "",
    notes: supplier.notes || "",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Proveedor</h1>
        <p className="text-muted-foreground">Modifica la información del proveedor {supplier.name}</p>
      </div>

      <SupplierForm initialData={supplierData} isEditing />
    </div>
  )
}
