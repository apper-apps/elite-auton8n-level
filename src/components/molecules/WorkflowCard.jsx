import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

function WorkflowCard({ workflow, onEdit, onDelete, onDownload }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'draft':
        return 'accent'
      default:
        return 'primary'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 bg-gradient-surface border border-gray-700 hover:border-primary/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
              {workflow?.name || 'Untitled Workflow'}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {workflow?.description || 'No description available'}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusColor(workflow?.status)} size="sm">
                {workflow?.status || 'Draft'}
              </Badge>
              <span className="text-xs text-gray-500">
                Updated {formatDate(workflow?.updatedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
            <ApperIcon 
              name={workflow?.iconName || 'workflow'} 
              className="w-6 h-6 text-primary" 
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ApperIcon name="layers" className="w-3 h-3" />
              {workflow?.nodeCount || 0} nodes
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="play" className="w-3 h-3" />
              {workflow?.runCount || 0} runs
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload?.(workflow)}
              className="text-gray-400 hover:text-white"
            >
              <ApperIcon name="download" className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(workflow)}
              className="text-gray-400 hover:text-white"
            >
              <ApperIcon name="edit" className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(workflow?.id || workflow?._id)}
              className="text-gray-400 hover:text-red-400"
            >
              <ApperIcon name="trash" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default WorkflowCard