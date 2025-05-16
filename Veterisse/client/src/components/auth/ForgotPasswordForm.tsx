"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { forgotPassword } from "@/lib/auth"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await forgotPassword(data.email)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || "Error al enviar el correo de recuperación")
      }
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success ? (
        <div className="space-y-6">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Volver a inicio de sesión
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
          </Button>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Volver a inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
