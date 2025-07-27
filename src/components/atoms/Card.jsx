import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  className, 
  children,
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-surface border border-slate-700/50 backdrop-blur-sm",
    glass: "bg-surface/30 border border-slate-600/30 backdrop-blur-md",
    gradient: "bg-gradient-to-br from-surface to-slate-800/50 border border-slate-600/50"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-primary/10",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"
export default Card