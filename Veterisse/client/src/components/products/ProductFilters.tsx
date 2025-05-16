"use client"
import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useStoreTableProductos } from "@/store"

// Datos de ejemplo para categorías

interface ProductFiltersProps {
  categories: string[],
  handleSearch: (query: string) => void
}

export function ProductFilters({categories, handleSearch}: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const {categoryStore, setCategoryStore} = useStoreTableProductos()
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [stockFilter, setStockFilter] = useState("all")

  const handleClearFilters = () => {
    setSearchQuery("")
    setCategoryStore("Todos")
    setMinPrice("")
    setMaxPrice("")
    setStockFilter("all")
  }

  const handleSearchQuery = (search: string) => {
    setSearchQuery(search)
    handleSearch(search)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, código o descripción..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Select value={categoryStore} onValueChange={setCategoryStore}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select value={categoryStore} onValueChange={setCategoryStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* TODO Falta: Agregar funcionalidad de filtros */}
              <div className="space-y-2">
                <Label>Rango de precio</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stock</Label>
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="in-stock">En stock</SelectItem>
                    <SelectItem value="low-stock">Bajo stock</SelectItem>
                    <SelectItem value="out-of-stock">Sin stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button variant="outline" className="w-full" onClick={handleClearFilters}>
                <X className="mr-2 h-4 w-4" />
                Limpiar filtros
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
