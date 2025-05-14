import type { Metadata } from "next"
import { UserForm } from "@/components/settings/user-form"

export const metadata: Metadata = {
  title: "Nuevo Usuario | Sistema de Inventario",
  description: "Añadir un nuevo usuario al sistema",
}

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Usuario</h1>
        <p className="text-muted-foreground">Crea una nueva cuenta de usuario para acceder al sistema.</p>
      </div>

      <UserForm />
    </div>
  )
}
