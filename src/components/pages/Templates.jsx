import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import TemplateCard from "@/components/molecules/TemplateCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { templateService } from "@/services/api/templateService"

const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Templates", icon: "Grid3X3" },
    { id: "CRM", name: "CRM & Sales", icon: "Users" },
    { id: "Email", name: "Email Marketing", icon: "Mail" },
    { id: "Database", name: "Database Sync", icon: "Database" },
    { id: "API", name: "API Integration", icon: "Zap" },
    { id: "Social Media", name: "Social Media", icon: "Share2" }
  ]

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await templateService.getAll()
      setTemplates(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUseTemplate = (template) => {
    toast.success(`Using template: ${template.name}`)
    // Here you would typically redirect to the generator with the template data
    setTimeout(() => {
      window.location.href = `/generator?template=${template.Id}`
    }, 1000)
  }

  const handlePreviewTemplate = (template) => {
    toast.info(`Preview for ${template.name} - Feature coming soon!`)
  }

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTemplates} />

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Workflow Templates
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get started quickly with pre-built workflow templates for common automation scenarios
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg h-14"
              />
              <ApperIcon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <ApperIcon name="Template" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{templates.length}</p>
              <p className="text-sm text-slate-400">Total Templates</p>
            </Card>
            <Card className="p-4 text-center">
              <ApperIcon name="Grid3X3" size={24} className="text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{categories.length - 1}</p>
              <p className="text-sm text-slate-400">Categories</p>
            </Card>
            <Card className="p-4 text-center">
              <ApperIcon name="Download" size={24} className="text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">1.2k</p>
              <p className="text-sm text-slate-400">Downloads</p>
            </Card>
            <Card className="p-4 text-center">
              <ApperIcon name="Star" size={24} className="text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-sm text-slate-400">Avg Rating</p>
            </Card>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                <ApperIcon name={category.icon} size={16} className="mr-2" />
                {category.name}
                {category.id !== "all" && (
                  <Badge variant="default" className="ml-2">
                    {templates.filter(t => t.category === category.id).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Filter Results Info */}
        {(searchTerm || selectedCategory !== "all") && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-400">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                >
                  <ApperIcon name="X" size={16} className="mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredTemplates.length === 0 ? (
            <Empty
              title="No templates found"
              description={searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search terms or category filter" 
                : "Templates are being loaded"}
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              icon="Search"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TemplateCard
                    template={template}
                    onUse={handleUseTemplate}
                    onPreview={() => handlePreviewTemplate(template)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Featured Templates Section */}
        {selectedCategory === "all" && !searchTerm && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Most Popular Templates
              </h2>
              <p className="text-slate-400">
                These templates are loved by our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.slice(0, 3).map((template, index) => (
                <motion.div
                  key={`featured-${template.Id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    <div className="text-center">
                      <div className="p-4 rounded-xl bg-primary/20 border border-primary/30 w-fit mx-auto mb-6">
                        <ApperIcon name={template.icon} size={32} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{template.name}</h3>
                      <p className="text-slate-400 mb-6">{template.description}</p>
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Download" size={16} className="text-slate-500" />
                          <span className="text-sm text-slate-500">245</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Star" size={16} className="text-warning" />
                          <span className="text-sm text-slate-300">4.9</span>
                        </div>
                      </div>
                      <Button variant="primary" onClick={() => handleUseTemplate(template)} className="w-full">
                        <ApperIcon name="Play" size={16} className="mr-2" />
                        Use This Template
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find What You Need?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Create a custom workflow from scratch using our AI-powered generator
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => window.location.href = "/generator"}>
                <ApperIcon name="Sparkles" size={24} className="mr-2" />
                Create Custom Workflow
              </Button>
              <Button variant="outline" size="lg">
                <ApperIcon name="MessageCircle" size={24} className="mr-2" />
                Request Template
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Templates