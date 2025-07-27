import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-error/20 to-error/10 p-6 rounded-full mb-6 backdrop-blur-sm border border-error/20">
        <ApperIcon name="AlertTriangle" size={48} className="text-error" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h3>
      <p className="text-lg text-slate-400 mb-8 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="lg">
          <ApperIcon name="RefreshCw" size={20} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error