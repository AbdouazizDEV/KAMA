import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#00A86B] text-white hover:bg-[#008F5A] shadow-[0px_1px_3px_rgba(10,14,39,0.08)]",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-red-500/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-2 border-[#00A86B] bg-transparent text-[#00A86B] hover:bg-[#E6F7F1]",
        ghost: "hover:bg-[#E6F7F1] hover:text-[#00A86B]",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-br from-[#00A86B] to-[#0066CC] text-white shadow-[0px_8px_24px_rgba(0,168,107,0.35)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
        gold: "bg-[#FFB800] text-[#0A0E27] hover:bg-[#E6A600] font-semibold"
      },
      size: {
        default: "h-12 px-6 py-3 rounded-lg text-base",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
