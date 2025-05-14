"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = {
  className?: string
  classNames?: Record<string, string>
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  initialFocus?: boolean
  mode?: "single" | "range" | "multiple"
  locale?: any
  showOutsideDays?: boolean
  [key: string]: any
}

function Calendar({
  className,
  classNames,
  selected,
  onSelect,
  disabled,
  initialFocus,
  mode = "single",
  locale,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const handleDateSelect = (day: number) => {
    if (!onSelect) return

    const now = new Date()
    const newDate = new Date(now.getFullYear(), now.getMonth(), day)
    onSelect(newDate)
  }

  // Renderizar un calendario simplificado
  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <button className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0")}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">
          {new Date().toLocaleDateString(locale?.code || "es", { month: "long", year: "numeric" })}
        </div>
        <button className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0")}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground p-1">
            {day}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => handleDateSelect(day)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal",
              selected && selected.getDate() === day ? "bg-primary text-primary-foreground" : "",
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
