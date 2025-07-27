import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import StatsCard from "@/components/molecules/StatsCard"
import WorkflowCard from "@/components/molecules/WorkflowCard"
import TemplateCard from "@/components/molecules/TemplateCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { workflowService } from "@/services/api/workflowService"
import { templateService } from "@/services/api/templateService"

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([])
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [quickInput, setQuickInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock user data
  const user = {
    name: "John Doe",
    tier: "free",
    workflowCount: 3,
    workflowLimit: 5
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [workflowsData, templatesData] = await Promise.all([
        workflowService.getAll(),
        templateService.getAll()
      ])
      
      setWorkflows(workflowsData.slice(0, 3)) // Show recent 3
      setTemplates(templatesData.slice(0, 4)) // Show 4 templates
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickGenerate = async () => {
    if (!quickInput.trim()) {
      toast.error("Please enter a workflow description")
      return
    }

    if (user.workflowCount >= user.workflowLimit && user.tier === "free") {
      toast.error("You've reached your workflow limit. Upgrade to create more workflows.")
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newWorkflow = {
        name: `Quick Workflow ${Date.now()}`,
        description: quickInput,
        jsonData: {
          nodes: [
            { id: "trigger", name: "Trigger", type: "trigger" },
            { id: "action", name: "Action", type: "action" }
          ]
        }
      }
      
      await workflowService.create(newWorkflow)
      setQuickInput("")
      toast.success("Workflow generated successfully!")
      loadData() // Refresh data
      
    } catch (err) {
      toast.error("Failed to generate workflow")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditWorkflow = (workflow) => {
    toast.info(`Opening workflow: ${workflow.name}`)
  }

  const handleDeleteWorkflow = async (id) => {
    try {
      await workflowService.delete(id)
      toast.success("Workflow deleted successfully")
      loadData()
    } catch (err) {
      toast.error("Failed to delete workflow")
    }
  }

  const handleDownloadWorkflow = (workflow) => {
    const blob = new Blob([JSON.stringify(workflow.jsonData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${workflow.name.replace(/\s+/g, "_")}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Workflow downloaded!")
  }

  const handleUseTemplate = (template) => {
    toast.info(`Using template: ${template.name}`)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-slate-400">
                Ready to build some amazing automations?
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <Link to="/generator">
                <Button variant="primary">
                  <ApperIcon name="Plus" size={20} className="mr-2" />
                  New Workflow
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline">
                  <ApperIcon name="Template" size={20} className="mr-2" />
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Workflows Created"
              value={user.workflowCount}
              icon="Workflow"
              color="primary"
            />
            <StatsCard
              title="Monthly Limit"
              value={`${user.workflowCount}/${user.workflowLimit}`}
              icon="Target"
              color="warning"
            />
            <StatsCard
              title="Templates Used"
              value="7"
              icon="Template"
              color="success"
            />
            <StatsCard
              title="Current Plan"
              value={user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
              icon="Crown"
              color="accent"
            />
          </div>

          {/* Upgrade Banner for Free Users */}
          {user.tier === "free" && (
            <Card className="p-6 mb-8 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-xl bg-accent/20 border border-accent/30">
                    <ApperIcon name="Zap" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Unlock Unlimited Workflows</h3>
                    <p className="text-slate-400">Upgrade to Pro and create unlimited automations</p>
                  </div>
                </div>
                <Link to="/pricing">
                  <Button variant="accent">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Quick Generator */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              <ApperIcon name="Sparkles" size={28} className="inline mr-3 text-primary" />
              Quick Workflow Generator
            </h2>
            <div className="space-y-4">
              <Input
                label="Describe your automation"
                placeholder="e.g., Send an email when a new customer signs up"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                className="text-lg"
              />
              <Button
                variant="primary"
                size="lg"
                onClick={handleQuickGenerate}
                disabled={isGenerating || (user.workflowCount >= user.workflowLimit && user.tier === "free")}
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Wand2" size={20} className="mr-2" />
                    Generate Workflow
                  </>
                )}
              </Button>
              {user.workflowCount >= user.workflowLimit && user.tier === "free" && (
                <p className="text-warning text-sm">
                  You've reached your monthly limit. <Link to="/pricing" className="text-accent hover:underline">Upgrade to Pro</Link> for unlimited workflows.
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Workflows */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Workflows</h2>
              <Link to="/workflows">
                <Button variant="ghost" size="sm">
                  View All
                  <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {workflows.length === 0 ? (
                <Empty
                  title="No workflows yet"
                  description="Create your first workflow to get started"
                  actionLabel="Create Workflow"
                  onAction={() => window.location.href = "/generator"}
                  icon="Workflow"
                />
              ) : (
                workflows.map((workflow) => (
                  <WorkflowCard
                    key={workflow.Id}
                    workflow={workflow}
                    onEdit={handleEditWorkflow}
                    onDelete={handleDeleteWorkflow}
                    onDownload={handleDownloadWorkflow}
                  />
                ))
              )}
            </div>
          </motion.div>

          {/* Popular Templates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Popular Templates</h2>
              <Link to="/templates">
                <Button variant="ghost" size="sm">
                  View All
                  <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {templates.map((template) => (
                <TemplateCard
                  key={template.Id}
                  template={template}
                  onUse={handleUseTemplate}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard