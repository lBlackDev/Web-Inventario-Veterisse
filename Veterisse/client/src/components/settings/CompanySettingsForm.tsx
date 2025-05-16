"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CompanySettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company-name">Nombre de la Empresa</Label>
          <Input id="company-name" defaultValue="Mi Empresa S.A." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-id">Identificación Fiscal</Label>
          <Input id="tax-id" defaultValue="A12345678" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Textarea id="address" defaultValue="Calle Principal 123, Ciudad" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" defaultValue="+1 (555) 123-4567" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" defaultValue="contacto@miempresa.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Sitio Web</Label>
        <Input id="website" defaultValue="https://www.miempresa.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Logo de la Empresa</Label>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Logo</span>
          </div>
          <Button type="button" variant="outline" size="sm">
            Cambiar Logo
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </form>
  )
}
