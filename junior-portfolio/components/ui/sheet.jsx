"use client";
import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority";
import { IoMdClose } from "react-icons/io"

import { cn } from "@/lib/utils"

const Sheet = Dialog.Root

const SheetTrigger = Dialog.Trigger

const SheetClose = Dialog.Close

const SheetPortal = Dialog.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
SheetOverlay.displayName = Dialog.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-primary p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-slate-950",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}

      <Dialog.Close
        className="absolute right-8 top-8 transition-opacity outline-noe">
        <IoMdClose className="text-3xl text-accent" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </SheetPortal>
))
SheetContent.displayName = Dialog.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-lg font-semibold text-slate-950 dark:text-slate-50", className)}
    {...props} />
))
SheetTitle.displayName = Dialog.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props} />
))
SheetDescription.displayName = Dialog.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
