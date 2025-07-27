import { motion } from "framer-motion"
import { format } from "date-fns"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const WorkflowCard = ({ workflow, onEdit, onDelete, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 hover:shadow-xl hover:shadow-primary/5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">{workflow.name}</h3>
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{workflow.description}</p>
            <div className="flex items-center space-x-4">
              <Badge variant="primary">
                <ApperIcon name="Workflow" size={12} className="mr-1" />
                Workflow
              </Badge>
              <span className="text-xs text-slate-500">
                Created {format(new Date(workflow.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button variant="ghost" size="sm" onClick={() => onEdit(workflow)}>
              <ApperIcon name="Edit2" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDownload(workflow)}>
              <ApperIcon name="Download" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(workflow.Id)}>
              <ApperIcon name="Trash2" size={16} className="text-error" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="GitBranch" size={16} className="text-slate-500" />
            <span className="text-sm text-slate-500">
              {workflow.jsonData?.nodes?.length || 0} nodes
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(workflow)}>
            Open
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default WorkflowCard