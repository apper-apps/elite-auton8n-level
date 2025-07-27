import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import PricingCard from "@/components/molecules/PricingCard"
import ApperIcon from "@/components/ApperIcon"

const LandingPage = () => {
  const [demoInput, setDemoInput] = useState("")
  const [demoResult, setDemoResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const features = [
    {
      icon: "MessageSquare",
      title: "Natural Language Processing",
      description: "Describe your automation in plain English and watch it come to life"
    },
    {
      icon: "Workflow",
      title: "Visual Workflow Builder",
      description: "See your automation flow with beautiful node-based visualizations"
    },
    {
      icon: "Download",
      title: "Export Ready JSON",
      description: "Download production-ready n8n workflow files instantly"
    },
    {
      icon: "Template",
      title: "Template Library",
      description: "Start with pre-built templates for common automation scenarios"
    },
    {
      icon: "Zap",
      title: "AI-Powered Generation",
      description: "Advanced AI understands complex workflow requirements"
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Share and collaborate on workflows with your team"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DevOps Engineer",
      company: "TechCorp",
      content: "AutoN8N has revolutionized how we create automation workflows. What used to take hours now takes minutes.",
      avatar: "S"
    },
    {
      name: "Marcus Rodriguez",
      role: "Automation Specialist",
      company: "DataFlow Inc",
      content: "The natural language processing is incredibly accurate. It understands complex requirements perfectly.",
      avatar: "M"
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      company: "StartupXYZ",
      content: "Our entire team can now create workflows without technical expertise. It's a game-changer.",
      avatar: "E"
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started",
      features: [
        "5 workflows per month",
        "Basic templates",
        "JSON export",
        "Community support"
      ]
    },
    {
      name: "Pro",
      price: 29,
      description: "For power users and teams",
      features: [
        "Unlimited workflows",
        "All templates",
        "Advanced AI features",
        "Priority support",
        "Folder organization",
        "Workflow sharing"
      ]
    },
    {
      name: "Business",
      price: 79,
      description: "For enterprises and agencies",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom branding",
        "White-label options",
        "Dedicated support"
      ]
    }
  ]

  const handleDemoGenerate = async () => {
    if (!demoInput.trim()) {
      toast.error("Please enter a workflow description")
      return
    }

    setIsGenerating(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResult = {
        name: "Generated Workflow",
        description: demoInput,
        nodes: [
          { id: "trigger", name: "Trigger", type: "trigger", parameters: { service: "Webhook" } },
          { id: "action1", name: "Process Data", type: "action", parameters: { service: "Function" } },
          { id: "action2", name: "Send Notification", type: "action", parameters: { service: "Slack" } }
        ],
        connections: [
          { sourceX: 0, sourceY: 0, targetX: 200, targetY: 0 },
          { sourceX: 200, sourceY: 0, targetX: 400, targetY: 0 }
        ]
      }
      setDemoResult(mockResult)
      setIsGenerating(false)
      toast.success("Demo workflow generated!")
    }, 2000)
  }

  const handlePlanSelect = (plan) => {
    if (plan.price === 0) {
      toast.success("Welcome to AutoN8N Free! Sign up to get started.")
    } else {
      toast.info(`${plan.name} plan selected. Redirecting to checkout...`)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Turn Ideas Into
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                n8n Workflows
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Describe your automation in plain English and watch AI transform it into production-ready n8n workflows
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/generator">
                <Button variant="primary" size="xl">
                  <ApperIcon name="Sparkles" size={24} className="mr-2" />
                  Start Building Free
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                <ApperIcon name="Play" size={24} className="mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Demo Generator */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Try It Now - Generate Your First Workflow
                </h2>
                <div className="space-y-6">
                  <div>
                    <Input
                      label="Describe your automation workflow"
                      placeholder="e.g., When a new row is added to Google Sheets, send a Slack message to the team channel"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      className="text-lg h-16"
                    />
                  </div>
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleDemoGenerate}
                    disabled={isGenerating}
                    className="w-full"
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
                        <ApperIcon name="Wand2" size={20} className="mr-2" />
                        Generate Workflow
                      </>
                    )}
                  </Button>
                  
                  {demoResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 rounded-xl"
                    >
                      <div className="flex items-center mb-4">
                        <ApperIcon name="CheckCircle" size={24} className="text-success mr-2" />
                        <span className="text-success font-semibold">Workflow Generated Successfully!</span>
                      </div>
                      <p className="text-slate-300 mb-4">{demoResult.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          {demoResult.nodes.length} nodes created
                        </span>
                        <Link to="/generator">
                          <Button variant="primary" size="sm">
                            View Full Editor
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Every Use Case
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and deploy automation workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 w-fit mb-6">
                    <ApperIcon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Automation Experts
            </h2>
            <p className="text-xl text-slate-400">
              See what our users are saying about AutoN8N
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.content}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-400">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onSelect={handlePlanSelect}
                popular={index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Automate Everything?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Join thousands of developers who are already building amazing automations with AutoN8N
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button variant="primary" size="xl">
                  <ApperIcon name="Rocket" size={24} className="mr-2" />
                  Start Building Now
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="xl">
                  <ApperIcon name="Template" size={24} className="mr-2" />
                  Browse Templates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage