import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { UserForm } from "@/components/settings/user-form"

// Datos de ejemplo para usuarios
const users = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@ejemplo.com",
    role: "admin",
    isActive: true,
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    role: "user",
    isActive: true,
  },
  {
    id: "3",
    name: "María González",
    email: "maria@ejemplo.com",
    role: "user",
    isActive: true,
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    role: "user",
    isActive: false,
  },
  {
    id: "5",
    name: "Ana Martínez",
    email: "ana@ejemplo.com",
    role: "admin",
    isActive: true,
  },
]

export const metadata: Metadata = {
  title: "Editar Usuario | Sistema de Inventario",
  description: "Modificar información de un usuario existente",
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Usuario</h1>
        <p className="text-muted-foreground">Modifica la información del usuario {user.name}</p>
      </div>

      <UserForm initialData={user} isEditing />
    </div>
  )
}
