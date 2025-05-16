import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import type { VariantProps } from "class-variance-authority";
import { cva } from 'class-variance-authority';
import { badgeVariants } from './ui/badge';

interface AlertDialogTableProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  description?: string;
  title: string;
  cancelText?: string;
  actionText: string;
  classNameAction?: string;
}


export default function AlertDialogTable({
  open, 
  onOpenChange, 
  onConfirm,
  description,
  title,
  cancelText="Cancelar",
  actionText="Enviar",
  variant,
  classNameAction
}: AlertDialogTableProps & VariantProps<typeof badgeVariants>) {

  const actionVariant = cva("shadow-md",
    {
      variants: {
        variant: {
          default:"bg-default text-default-foreground hover:bg-default/90", 
          destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",
          secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/90",
          outline:"text-foreground hover:bg-accent hover:text-accent-foreground",
          success:"text-white bg-[var(--bg-success)] hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60",
        }
      },
      defaultVariants: {
        variant: "default",
      }
    }
  )
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='shadow'>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(actionVariant({variant}), classNameAction)}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
