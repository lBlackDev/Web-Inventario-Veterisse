"use client"

import { useActionState, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getCategories } from "@/api/category"
import { useAxios } from "@/hooks/useAxios"
import { newProduct } from "@/api/products"
import { useProduct } from "@/hooks/useProduct"
import Image from "next/image"

// Esquema de validación para el formulario
const productFormSchema = z.object({
  code: z.string().min(1, "El código es obligatorio"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  category: z.string().min(1, "La categoría es obligatoria"),
  unit: z.string().min(1, "La unidad de medida es obligatoria"),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  minStock: z.coerce.number().min(0, "El stock mínimo no puede ser negativo"),
  costPrice: z.coerce.number().min(0, "El precio de compra no puede ser negativo"),
  price: z.coerce.number().min(0, "El precio de venta no puede ser negativo"),
  supplier: z.string().optional(),
  location: z.string().optional(),
  taxable: z.boolean().default(true).optional(),
  active: z.boolean().default(true).optional(),
  img: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productFormSchema>

const suppliers = ["HP Inc.", "Dell Technologies", "Logitech", "Samsung", "Corsair", "Sony", "TP-Link"]

// Propiedades del componente
interface ProductFormProps {
  initialData?: ProductFormValues
  isEditing?: boolean
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps = {}) {
  const router = useRouter()
  const {data: categories} = getCategories()
  const { newProduct } = useProduct()
  const [imgProduct, setImgProduct] = useState<string | null>("")

  const [error, submitAction, isSubmitting] = useActionState(
    async (_:any, formData: FormData): Promise<boolean | null> => {
      if(formData.get("name") === "" && formData.get("description") === "") {
        return true
      }

      const product = {
        name: formData.get("name"),
        img: '',
        description: formData.get("description"),
        category: formData.get("category"),
        stock: Number(formData.get("stock")),
        minStock: Number(formData.get("minStock")),
        price: Number(parseFloat(formData.get("price") as string).toFixed(2)),
        costPrice: Number(parseFloat(formData.get("costPrice") as string).toFixed(2)),
        supplier: formData.get("supplier"),
        active: formData.get("active"),
      }

      const data = newProduct(product)

      if(!data) {
        return false
      }

      router.refresh()
      router.push("/products")
      return null
    },
    null
  )

  // Valores por defecto para el formulario
  const defaultValues: Partial<ProductFormValues> = {
    ...initialData,
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })


  const handleChangeImage = (src: string) => {
    setImgProduct(src)
    console.log(src)
  }

  return (
    <Form {...form}>
      <form action={submitAction} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información Básica</h3>
                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* <FormField
                    control={form.control}
                    name="code"
                    render={() => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: PROD-001" name="code"/>
                        </FormControl>
                        <FormDescription>Código único del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                    <FormField
                      control={form.control}
                      name="name"
                      render={() => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del producto" name="name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <FormField
                    control={form.control}
                    name="category"
                    render={() => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select name="category">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map(({category}) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={() => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripción detallada del producto" className="resize-none" name="description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="img"
                    render={() => (
                      <FormItem>
                        <FormLabel>Imagen</FormLabel>
                        <FormControl>
                          <Input type="file" name="img" onChange={(e) => handleChangeImage(e.target.src)}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <div className=" rounded-md">
                    <Image 
                      src={imgProduct || ""}
                      alt="Imagen del producto"
                      width={`${200}`}
                      height={100}
                      className="rounded-md"
                      
                    />
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Inventario y Precios</h3>
                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="stock"
                      render={() => (
                        <FormItem>
                          <FormLabel>Stock Inicial</FormLabel>
                          <FormControl>
                            <Input type="number" name="stock"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="minStock"
                    render={() => (
                      <FormItem>
                        <FormLabel>Stock Mínimo</FormLabel>
                        <FormControl>
                          <Input type="number" name="minStock"/>
                        </FormControl>
                        <FormDescription>Nivel para alertas de bajo stock</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={() => (
                      <FormItem>
                        <FormLabel>Precio de Compra</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" name="costPrice" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={() => (
                      <FormItem>
                        <FormLabel>Precio de Venta</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" name="price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={() => (
                      <FormItem>
                        <FormLabel>Proveedor</FormLabel>
                        <Select name="supplier">
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

                  {/* <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar ubicación" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">Sin ubicación</SelectItem>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                <div className="space-y-4">
                  {/* <FormField
                    control={form.control}
                    name="taxable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sujeto a impuestos</FormLabel>
                          <FormDescription>Este producto está sujeto a impuestos en las ventas</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="active"
                    render={() => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox  name="active"/>
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Producto activo</FormLabel>
                          <FormDescription>Este producto está disponible para su venta</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/products")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
