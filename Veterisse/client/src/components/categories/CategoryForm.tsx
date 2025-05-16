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

// Esquema de validación para el formulario
const categoryFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

// Propiedades del componente
interface CategoryFormProps {
  initialData?: CategoryFormValues
  isEditing?: boolean
}

export function CategoryForm({ initialData, isEditing = false }: CategoryFormProps = {}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para el formulario
  const defaultValues: Partial<CategoryFormValues> = {
    name: "",
    description: "",
    ...initialData,
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para guardar la categoría
      console.log("Datos de la categoría:", data)

      // Simular un retraso para la operación
      // TODO Conectar con el backend para guardar la categoría
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al listado de categorías
      router.push("/dashboard/categories")
    } catch (error) {
      console.error("Error al guardar la categoría:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la categoría" {...field} />
                    </FormControl>
                    <FormDescription>Este nombre se mostrará en los listados de productos.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción detallada de la categoría"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporciona una descripción clara para identificar el tipo de productos que pertenecen a esta
                      categoría.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/categories")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Categoría" : "Crear Categoría"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
