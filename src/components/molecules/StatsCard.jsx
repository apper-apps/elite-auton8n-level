import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const StatsCard = ({ title, value, icon, trend, color = "primary" }) => {
  const colorClasses = {
    primary: "text-primary bg-primary/20 border-primary/30",
    success: "text-success bg-success/20 border-success/30",
    warning: "text-warning bg-warning/20 border-warning/30",
    accent: "text-accent bg-accent/20 border-accent/30"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 hover:shadow-xl hover:shadow-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <ApperIcon 
                  name={trend > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={trend > 0 ? "text-success" : "text-error"} 
                />
                <span className={`text-sm ml-1 ${trend > 0 ? "text-success" : "text-error"}`}>
                  {Math.abs(trend)}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default StatsCard