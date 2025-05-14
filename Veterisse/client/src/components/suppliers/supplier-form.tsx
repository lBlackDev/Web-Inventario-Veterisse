"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Esquema de validación para el formulario
const supplierFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  contactName: z.string().min(2, "El nombre de contacto debe tener al menos 2 caracteres"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Ingrese un correo electrónico válido").optional(),
  notes: z.string().optional(),
})

type SupplierFormValues = z.infer<typeof supplierFormSchema>

// Propiedades del componente
interface SupplierFormProps {
  initialData?: SupplierFormValues
  isEditing?: boolean
}

export function SupplierForm({ initialData, isEditing = false }: SupplierFormProps = {}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para el formulario
  const defaultValues: Partial<SupplierFormValues> = {
    name: "",
    contactName: "",
    address: "",
    phone: "",
    email: "",
    notes: "",
    ...initialData,
  }

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: SupplierFormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para guardar el proveedor
      console.log("Datos del proveedor:", data)

      // Simular un retraso para la operación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al listado de proveedores
      router.push("/dashboard/suppliers")
    } catch (error) {
      console.error("Error al guardar el proveedor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Información General</h3>
                <p className="text-sm text-muted-foreground">
                  Información básica del proveedor para identificación y contacto.
                </p>
              </div>
              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del proveedor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Persona de Contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre y apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Dirección completa" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas Adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Información adicional sobre el proveedor"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Puedes incluir información sobre condiciones de pago, tiempos de entrega, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/suppliers")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Proveedor" : "Crear Proveedor"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
