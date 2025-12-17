'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const FilterSidebar = SheetPrimitive.Root
const FilterSidebarTrigger = SheetPrimitive.Trigger
const FilterSidebarClose = SheetPrimitive.Close
const FilterSidebarPortal = SheetPrimitive.Portal

const FilterSidebarOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      // Hide overlay on large screens
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out lg:hidden',
      className
    )}
    {...props}
  />
))
FilterSidebarOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left:
          // ✅ Always visible on lg screens
          'left-0 top-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left w-3/4 sm:max-w-sm lg:static lg:z-auto lg:block lg:w-2/12 lg:translate-x-0 lg:transform-none lg:shadow-none lg:p-0 lg:border-0',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const FilterSidebarContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'left', className, children, ...props }, ref) => (
  <FilterSidebarPortal>
    <FilterSidebarOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {/* ❌ Hide Close button on large screens */}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary lg:hidden">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>

      {children}
    </SheetPrimitive.Content>
  </FilterSidebarPortal>
))
FilterSidebarContent.displayName = SheetPrimitive.Content.displayName

export {
  FilterSidebar,
  FilterSidebarClose,
  FilterSidebarOverlay,
  FilterSidebarPortal,
  FilterSidebarTrigger,
  FilterSidebarContent,
}
