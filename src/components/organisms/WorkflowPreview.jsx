import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const WorkflowPreview = ({ workflow }) => {
  if (!workflow || !workflow.nodes) {
    return (
      <Card className="p-8 text-center">
        <ApperIcon name="Workflow" size={48} className="text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400">Generate a workflow to see the preview</p>
      </Card>
    )
  }

  const nodes = workflow.nodes || []
  const connections = workflow.connections || []

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Workflow Preview</h3>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <ApperIcon name="GitBranch" size={16} />
          <span>{nodes.length} nodes</span>
        </div>
      </div>

      <div className="relative h-96 overflow-hidden rounded-xl bg-background/50 border border-slate-700">
        <svg className="w-full h-full">
          {/* Render connections */}
          {connections.map((connection, index) => (
            <motion.path
              key={index}
              d={`M ${connection.sourceX + 100} ${connection.sourceY + 40} 
                  C ${connection.sourceX + 150} ${connection.sourceY + 40}
                    ${connection.targetX + 50} ${connection.targetY + 40}
                    ${connection.targetX + 100} ${connection.targetY + 40}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          ))}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Render nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: `${(index % 3) * 200 + 50}px`,
              top: `${Math.floor(index / 3) * 120 + 50}px`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-4 min-w-[140px] backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1 rounded bg-primary/30">
                  <ApperIcon name={node.type === "trigger" ? "Play" : "Settings"} size={16} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-primary uppercase">
                  {node.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{node.name}</h4>
              <p className="text-xs text-slate-400 truncate">{node.parameters?.service || "n8n node"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export default WorkflowPreview