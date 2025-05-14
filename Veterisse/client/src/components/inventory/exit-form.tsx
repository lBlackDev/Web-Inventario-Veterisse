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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ProductSelector } from "@/components/inventory/product-selector"

// Esquema de validación para el formulario
const exitFormSchema = z.object({
  productId: z.string().min(1, "Debe seleccionar un producto"),
  quantity: z.coerce.number().positive("La cantidad debe ser mayor a 0"),
  price: z.coerce.number().nonnegative("El precio no puede ser negativo").optional(),
  reference: z.string().optional(),
  client: z.string().optional(),
  date: z.date(),
  notes: z.string().optional(),
})

type ExitFormValues = z.infer<typeof exitFormSchema>

export function ExitForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; code: string } | null>(null)

  // Valores por defecto para el formulario
  const defaultValues: Partial<ExitFormValues> = {
    productId: "",
    quantity: 10,
    price: 0,
    reference: "",
    client: "",
    date: new Date(),
    notes: "",
  }

  const form = useForm<ExitFormValues>({
    resolver: zodResolver(exitFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: ExitFormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para guardar la salida de stock
      console.log("Datos de la salida:", data)

      // Simular un retraso para la operación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al listado de movimientos
      router.push("/dashboard/inventory")
    } catch (error) {
      console.error("Error al guardar la salida:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProductSelect = (product: { id: string; name: string; code: string }) => {
    setSelectedProduct(product)
    form.setValue("productId", product.id)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto</FormLabel>
                    <ProductSelector onSelect={handleProductSelect} selectedProduct={selectedProduct} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio de venta</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                          value={field.value}

                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referencia (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Factura #123, Orden #456" {...field} />
                      </FormControl>
                      <FormDescription>Número de factura o referencia de venta</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split("T")[0] : ""}
                          // className="w-40"
                          onChange={(e) => {
                            const date = e.target.value ? new Date(e.target.value) : new Date()
                            field.onChange(date)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Información adicional sobre esta salida"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/inventory")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Registrar Salida"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
