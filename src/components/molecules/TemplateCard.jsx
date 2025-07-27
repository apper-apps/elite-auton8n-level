import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const TemplateCard = ({ template, onUse }) => {
  const getCategoryColor = (category) => {
    const colors = {
      "CRM": "primary",
      "Email": "success",
      "Database": "warning",
      "API": "accent",
      "Social Media": "primary"
    }
    return colors[category] || "default"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
              <ApperIcon name={template.icon} size={24} className="text-primary" />
            </div>
            <Badge variant={getCategoryColor(template.category)}>
              {template.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
          <p className="text-slate-400 text-sm">{template.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="GitBranch" size={16} className="text-slate-500" />
            <span className="text-sm text-slate-500">
              {template.jsonData?.nodes?.length || 0} nodes
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={() => onUse(template)}>
            <ApperIcon name="Play" size={16} className="mr-2" />
            Use Template
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default TemplateCard