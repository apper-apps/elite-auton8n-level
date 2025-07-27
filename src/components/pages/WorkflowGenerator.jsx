import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import WorkflowPreview from "@/components/organisms/WorkflowPreview"
import JsonViewer from "@/components/organisms/JsonViewer"
import ApperIcon from "@/components/ApperIcon"
import { workflowService } from "@/services/api/workflowService"

const WorkflowGenerator = () => {
  const [description, setDescription] = useState("")
  const [workflowName, setWorkflowName] = useState("")
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a workflow description")
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI processing with more realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock workflow based on description
      const mockWorkflow = generateMockWorkflow(description)
      setGeneratedWorkflow(mockWorkflow)
      
      // Auto-generate workflow name if not provided
      if (!workflowName) {
        setWorkflowName(`Workflow ${Date.now()}`)
      }
      
      toast.success("Workflow generated successfully!")
      
    } catch (err) {
      toast.error("Failed to generate workflow")
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockWorkflow = (desc) => {
    const lowerDesc = desc.toLowerCase()
    const nodes = []
    const connections = []

    // Create trigger node
    let triggerType = "webhook"
    if (lowerDesc.includes("google sheets") || lowerDesc.includes("spreadsheet")) {
      triggerType = "googleSheets"
    } else if (lowerDesc.includes("email") || lowerDesc.includes("gmail")) {
      triggerType = "email"
    } else if (lowerDesc.includes("form") || lowerDesc.includes("submit")) {
      triggerType = "webhook"
    } else if (lowerDesc.includes("schedule") || lowerDesc.includes("time")) {
      triggerType = "cron"
    }

    nodes.push({
      id: "trigger",
      name: getTriggerName(triggerType),
      type: "trigger",
      parameters: { service: triggerType }
    })

    // Add processing nodes
    let nodeIndex = 1
    if (lowerDesc.includes("filter") || lowerDesc.includes("condition")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "If Condition",
        type: "action",
        parameters: { service: "if" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    if (lowerDesc.includes("transform") || lowerDesc.includes("modify") || lowerDesc.includes("process")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "Function",
        type: "action",
        parameters: { service: "function" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    // Add output nodes
    if (lowerDesc.includes("slack")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "Slack",
        type: "action",
        parameters: { service: "slack" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    if (lowerDesc.includes("email") && !lowerDesc.includes("gmail trigger")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "Send Email",
        type: "action",
        parameters: { service: "emailSend" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    if (lowerDesc.includes("database") || lowerDesc.includes("mysql") || lowerDesc.includes("postgres")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "Database",
        type: "action",
        parameters: { service: "database" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    if (lowerDesc.includes("airtable")) {
      nodes.push({
        id: `node${nodeIndex}`,
        name: "Airtable",
        type: "action",
        parameters: { service: "airtable" }
      })
      connections.push({ sourceX: (nodeIndex - 1) * 200, sourceY: 0, targetX: nodeIndex * 200, targetY: 0 })
      nodeIndex++
    }

    // If no specific outputs found, add a generic action
    if (nodes.length === 1) {
      nodes.push({
        id: "node1",
        name: "HTTP Request",
        type: "action",
        parameters: { service: "httpRequest" }
      })
      connections.push({ sourceX: 0, sourceY: 0, targetX: 200, targetY: 0 })
    }

    return {
      name: workflowName || `Generated Workflow`,
      description: description,
      nodes: nodes,
      connections: connections,
      settings: {
        executionOrder: "v1"
      }
    }
  }

  const getTriggerName = (type) => {
    const names = {
      webhook: "Webhook",
      googleSheets: "Google Sheets Trigger",
      email: "Gmail Trigger",
      cron: "Schedule Trigger"
    }
    return names[type] || "Webhook"
  }

  const handleSave = async () => {
    if (!generatedWorkflow) {
      toast.error("Generate a workflow first")
      return
    }

    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name")
      return
    }

    setIsSaving(true)
    
    try {
      const workflowData = {
        name: workflowName,
        description: description,
        jsonData: generatedWorkflow
      }
      
      await workflowService.create(workflowData)
      toast.success("Workflow saved successfully!")
      
    } catch (err) {
      toast.error("Failed to save workflow")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    if (!generatedWorkflow) {
      toast.error("Generate a workflow first")
      return
    }

    const blob = new Blob([JSON.stringify(generatedWorkflow, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${workflowName.replace(/\s+/g, "_") || "workflow"}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Workflow downloaded!")
  }

  const handleClear = () => {
    setDescription("")
    setWorkflowName("")
    setGeneratedWorkflow(null)
    toast.info("Generator cleared")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Workflow Generator
              </h1>
              <p className="text-slate-400">
                Describe your automation and let AI create the perfect n8n workflow
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <Button variant="ghost" onClick={handleClear}>
                <ApperIcon name="RotateCcw" size={20} className="mr-2" />
                Clear
              </Button>
              {generatedWorkflow && (
                <>
                  <Button variant="outline" onClick={handleDownload}>
                    <ApperIcon name="Download" size={20} className="mr-2" />
                    Download
                  </Button>
                  <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" size={20} className="mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Generator Form */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Input
                label="Workflow Name"
                placeholder="My Awesome Workflow"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Complexity
                </label>
                <select className="flex h-12 w-full rounded-xl border border-slate-600 bg-surface/50 px-4 py-3 text-base text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="simple">Simple (2-3 nodes)</option>
                  <option value="medium">Medium (4-6 nodes)</option>
                  <option value="complex">Complex (7+ nodes)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Workflow Description
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-xl border border-slate-600 bg-surface/50 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Describe your automation workflow in detail. For example: 'When a new customer signs up via our contact form, send a welcome email, add them to our CRM, and notify the sales team in Slack.'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
              <div className="mt-2 text-sm text-slate-500">
                {description.length}/1000 characters
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !description.trim()}
                className="flex-1 sm:flex-none"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Generating Workflow...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Sparkles" size={24} className="mr-2" />
                    Generate Workflow
                  </>
                )}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="lg">
                  <ApperIcon name="Upload" size={20} className="mr-2" />
                  Import
                </Button>
                <Button variant="ghost" size="lg">
                  <ApperIcon name="HelpCircle" size={20} className="mr-2" />
                  Examples
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Preview and Code */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Workflow Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Visual Preview</h2>
            <WorkflowPreview workflow={generatedWorkflow} />
          </motion.div>

          {/* JSON Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">n8n JSON Code</h2>
            <JsonViewer data={generatedWorkflow} title="Generated Workflow" />
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              <ApperIcon name="Lightbulb" size={24} className="inline mr-2 text-warning" />
              Tips for Better Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Be Specific</h4>
                <p className="text-slate-400 text-sm">
                  Include details about triggers, conditions, and actions. Mention specific services like "Slack", "Gmail", or "Google Sheets".
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Include Context</h4>
                <p className="text-slate-400 text-sm">
                  Explain the business logic and conditions when things should happen.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Mention Data Flow</h4>
                <p className="text-slate-400 text-sm">
                  Describe how data should be transformed or what information needs to be passed between steps.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Error Handling</h4>
                <p className="text-slate-400 text-sm">
                  Mention what should happen when things go wrong or if certain conditions aren't met.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default WorkflowGenerator