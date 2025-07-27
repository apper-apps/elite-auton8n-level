import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 active:scale-95",
    secondary: "bg-gradient-surface text-white border border-slate-600 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 active:scale-95",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white active:scale-95",
    ghost: "bg-transparent text-slate-300 hover:bg-surface hover:text-white active:scale-95",
    accent: "bg-gradient-accent text-white hover:brightness-110 hover:shadow-lg hover:shadow-accent/25 active:scale-95"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"
export default Button