"use client"

import { useState, useEffect, useRef } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Datos de ejemplo para productos
const products = [
  { id: "1", name: "Laptop HP Pavilion", code: "PROD-001" },
  { id: "2", name: 'Monitor Dell 27"', code: "PROD-002" },
  { id: "3", name: "Teclado Mecánico RGB", code: "PROD-003" },
  { id: "4", name: "Mouse Inalámbrico", code: "PROD-004" },
  { id: "5", name: "Disco SSD 1TB", code: "PROD-005" },
  { id: "6", name: "Memoria RAM 16GB", code: "PROD-006" },
  { id: "7", name: "Impresora Láser", code: "PROD-007" },
  { id: "8", name: "Webcam HD", code: "PROD-008" },
  { id: "9", name: "Auriculares Bluetooth", code: "PROD-009" },
  { id: "10", name: "Router WiFi", code: "PROD-010" },
]

interface ProductSelectorProps {
  onSelect: (product: { id: string; name: string; code: string }) => void
  selectedProduct: { id: string; name: string; code: string } | null
}

export function ProductSelector({ onSelect, selectedProduct }: ProductSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseQuery) || product.code.toLowerCase().includes(lowercaseQuery),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          onClick={() => {
            setOpen(true)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }}
        >
          {selectedProduct ? (
            <div className="flex flex-col items-start">
              <span>{selectedProduct.name}</span>
              <span className="text-xs text-muted-foreground">{selectedProduct.code}</span>
            </div>
          ) : (
            "Seleccionar producto"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <CommandInput
              ref={inputRef}
              placeholder="Buscar producto..."
              className="h-9 border-0 outline-none focus:ring-0"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          <CommandList>
            <CommandEmpty>No se encontraron productos.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  value={`${product.name} ${product.code}`}
                  onSelect={() => {
                    onSelect(product)
                    setOpen(false)
                  }}
                >
                  <div className="flex flex-col ">
                    <span className="text-white">{product.name}</span>
                    <span className="text-xs text-muted-foreground">{product.code}</span>
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedProduct?.id === product.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
