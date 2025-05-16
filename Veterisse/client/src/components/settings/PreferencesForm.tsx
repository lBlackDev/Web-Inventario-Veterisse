"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function PreferencesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [lowStockAlerts, setLowStockAlerts] = useState(true)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currency">Moneda</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Seleccionar moneda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
            <SelectItem value="EUR">Euro (EUR)</SelectItem>
            <SelectItem value="GBP">Libra Esterlina (GBP)</SelectItem>
            <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
            <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
            <SelectItem value="ARS">Peso Argentino (ARS)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date-format">Formato de Fecha</Label>
        <Select value={dateFormat} onValueChange={setDateFormat}>
          <SelectTrigger id="date-format">
            <SelectValue placeholder="Seleccionar formato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="flex-1">
            Notificaciones
            <span className="block text-xs text-muted-foreground">Recibir notificaciones del sistema</span>
          </Label>
          <Switch id="notifications" checked={enableNotifications} onCheckedChange={setEnableNotifications} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="low-stock" className="flex-1">
            Alertas de Bajo Stock
            <span className="block text-xs text-muted-foreground">
              Notificar cuando los productos estén por debajo del stock mínimo
            </span>
          </Label>
          <Switch id="low-stock" checked={lowStockAlerts} onCheckedChange={setLowStockAlerts} />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar Preferencias"}
      </Button>
    </form>
  )
}
