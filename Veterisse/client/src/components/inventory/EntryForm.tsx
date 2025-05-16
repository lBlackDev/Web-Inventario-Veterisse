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
import { ProductSelector } from "@/components/inventory/ProductSelector"

// Esquema de validación para el formulario
const entryFormSchema = z.object({
  productId: z.string().min(1, "Debe seleccionar un producto"),
  quantity: z.coerce.number().positive("La cantidad debe ser mayor a 0"),
  price: z.coerce.number().nonnegative("El precio no puede ser negativo").optional(),
  reference: z.string().optional(),
  supplier: z.string().optional(),
  date: z.date(),
  notes: z.string().optional(),
})

type EntryFormValues = z.infer<typeof entryFormSchema>

// Datos de ejemplo para proveedores
const suppliers = ["HP Inc.", "Dell Technologies", "Logitech", "Samsung", "Corsair", "Sony", "TP-Link"]

export function EntryForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; code: string } | null>(null)

  // Valores por defecto para el formulario
  const defaultValues: Partial<EntryFormValues> = {
    productId: "",
    quantity: 1,
    price: 0,
    reference: "",
    supplier: "",
    date: new Date(),
    notes: "",
  }

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: EntryFormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para guardar la entrada de stock
      console.log("Datos de la entrada:", data)

      // Simular un retraso para la operación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al listado de movimientos
      router.push("/inventory")
    } catch (error) {
      console.error("Error al guardar la entrada:", error)
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
                <div>
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio de Compra</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>Dejar en blanco para mantener el precio actual</FormDescription>
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
                      <FormDescription>Número de factura o referencia de compra</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proveedor (opcional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar proveedor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">Sin proveedor</SelectItem>
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier} value={supplier}>
                                {supplier}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                          placeholder="Información adicional sobre esta entrada"
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
          <Button type="button" variant="outline" onClick={() => router.push("/inventory")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Registrar Entrada"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
