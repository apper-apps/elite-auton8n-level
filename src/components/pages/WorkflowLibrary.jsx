import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import WorkflowCard from "@/components/molecules/WorkflowCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { workflowService } from "@/services/api/workflowService"

const WorkflowLibrary = () => {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")

  // Mock user data
  const user = {
    tier: "free"
  }

  useEffect(() => {
    loadWorkflows()
  }, [])

  const loadWorkflows = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await workflowService.getAll()
      setWorkflows(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (sortOption) => {
    setSortBy(sortOption)
  }

  const handleFilter = (filterOption) => {
    setFilterBy(filterOption)
  }

  const handleEditWorkflow = (workflow) => {
    toast.info(`Opening workflow: ${workflow.name}`)
  }

  const handleDeleteWorkflow = async (id) => {
    if (window.confirm("Are you sure you want to delete this workflow?")) {
      try {
        await workflowService.delete(id)
        toast.success("Workflow deleted successfully")
        loadWorkflows()
      } catch (err) {
        toast.error("Failed to delete workflow")
      }
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

  const handleDuplicateWorkflow = async (workflow) => {
    try {
      const duplicatedWorkflow = {
        name: `${workflow.name} (Copy)`,
        description: workflow.description,
        jsonData: workflow.jsonData
      }
      await workflowService.create(duplicatedWorkflow)
      toast.success("Workflow duplicated successfully")
      loadWorkflows()
    } catch (err) {
      toast.error("Failed to duplicate workflow")
    }
  }

  const handleCreateFolder = () => {
    if (user.tier === "free") {
      toast.error("Folder organization is available in Pro and Business plans")
      return
    }
    toast.info("Folder creation feature coming soon!")
  }

  // Filter and sort workflows
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterBy === "all") return matchesSearch
    // Add more filter options as needed
    return matchesSearch
  }).sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt)
      case "name":
        return a.name.localeCompare(b.name)
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt)
      default:
        return 0
    }
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadWorkflows} />

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Workflow Library
              </h1>
              <p className="text-slate-400">
                Manage and organize all your automation workflows
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <Button variant="outline" onClick={handleCreateFolder} disabled={user.tier === "free"}>
                <ApperIcon name="FolderPlus" size={20} className="mr-2" />
                New Folder
              </Button>
              <Button variant="primary" onClick={() => window.location.href = "/generator"}>
                <ApperIcon name="Plus" size={20} className="mr-2" />
                New Workflow
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Workflows</p>
                  <p className="text-2xl font-bold text-white">{workflows.length}</p>
                </div>
                <ApperIcon name="Workflow" size={24} className="text-primary" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active</p>
                  <p className="text-2xl font-bold text-white">{workflows.length}</p>
                </div>
                <ApperIcon name="Play" size={24} className="text-success" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">This Month</p>
                  <p className="text-2xl font-bold text-white">
                    {workflows.filter(w => new Date(w.createdAt).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
                <ApperIcon name="Calendar" size={24} className="text-warning" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Folders</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <ApperIcon name="Folder" size={24} className="text-accent" />
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <select
                  className="flex h-12 w-full rounded-xl border border-slate-600 bg-surface/50 px-4 py-3 text-base text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="recent">Sort by Recent</option>
                  <option value="name">Sort by Name</option>
                  <option value="oldest">Sort by Oldest</option>
                </select>
              </div>
              <div>
                <select
                  className="flex h-12 w-full rounded-xl border border-slate-600 bg-surface/50 px-4 py-3 text-base text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={filterBy}
                  onChange={(e) => handleFilter(e.target.value)}
                >
                  <option value="all">All Workflows</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
            </div>

            {/* Filter Tags */}
            {(searchTerm || sortBy !== "recent" || filterBy !== "all") && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-700">
                <span className="text-sm text-slate-400">Active filters:</span>
                {searchTerm && (
                  <Badge variant="primary">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 hover:text-white"
                    >
                      <ApperIcon name="X" size={12} />
                    </button>
                  </Badge>
                )}
                {sortBy !== "recent" && (
                  <Badge variant="default">
                    Sort: {sortBy}
                    <button
                      onClick={() => setSortBy("recent")}
                      className="ml-2 hover:text-white"
                    >
                      <ApperIcon name="X" size={12} />
                    </button>
                  </Badge>
                )}
                {filterBy !== "all" && (
                  <Badge variant="default">
                    Filter: {filterBy}
                    <button
                      onClick={() => setFilterBy("all")}
                      className="ml-2 hover:text-white"
                    >
                      <ApperIcon name="X" size={12} />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Pro Feature Banner */}
        {user.tier === "free" && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-xl bg-accent/20 border border-accent/30">
                    <ApperIcon name="FolderPlus" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Organize with Folders</h3>
                    <p className="text-slate-400">Upgrade to Pro to organize workflows in folders and unlock advanced features</p>
                  </div>
                </div>
                <Button variant="accent" onClick={() => window.location.href = "/pricing"}>
                  Upgrade to Pro
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Workflows Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredWorkflows.length === 0 ? (
            <Empty
              title="No workflows found"
              description={searchTerm ? "Try adjusting your search terms or filters" : "Create your first workflow to get started"}
              actionLabel="Create Workflow"
              onAction={() => window.location.href = "/generator"}
              icon="Workflow"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow, index) => (
                <motion.div
                  key={workflow.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WorkflowCard
                    workflow={workflow}
                    onEdit={handleEditWorkflow}
                    onDelete={handleDeleteWorkflow}
                    onDownload={handleDownloadWorkflow}
                    onDuplicate={() => handleDuplicateWorkflow(workflow)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Pagination placeholder */}
        {filteredWorkflows.length > 12 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="ChevronLeft" size={16} className="mr-1" />
                Previous
              </Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">
                Next
                <ApperIcon name="ChevronRight" size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowLibrary