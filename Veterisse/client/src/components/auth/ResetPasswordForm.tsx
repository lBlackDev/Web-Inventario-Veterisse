"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resetPassword } from "@/lib/auth"
import { AlertCircle } from "lucide-react"

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setError("Token de recuperación inválido o expirado")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await resetPassword({
        token,
        password: data.password,
      })

      if (result.success) {
        router.push("/login?reset=true")
      } else {
        setError(result.error || "Error al restablecer la contraseña")
      }
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="mt-8 space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Token de recuperación inválido o expirado. Por favor, solicita un nuevo enlace de recuperación.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input id="password" type="password" {...register("password")} autoComplete="new-password" />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} autoComplete="new-password" />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/login" className="font-medium text-primary hover:underline">
            Volver a inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  )
}
