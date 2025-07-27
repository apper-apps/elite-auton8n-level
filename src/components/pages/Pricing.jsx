import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import PricingCard from "@/components/molecules/PricingCard"
import ApperIcon from "@/components/ApperIcon"

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started with automation",
      features: [
        "5 workflows per month",
        "Basic workflow templates",
        "JSON export functionality",
        "Community support",
        "Visual workflow preview",
        "Basic AI generation"
      ],
      limitations: [
        "Limited to 5 workflows/month",
        "No folder organization",
        "No team collaboration"
      ]
    },
    {
      name: "Pro",
      price: 29,
      yearlyPrice: 24,
      description: "For power users and growing teams",
      features: [
        "Unlimited workflow creation",
        "Access to all premium templates",
        "Advanced AI features",
        "Priority email support",
        "Workflow folder organization",
        "Workflow sharing & collaboration",
        "Advanced workflow analytics",
        "Custom workflow branding",
        "Export to multiple formats"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Business",
      price: 79,
      yearlyPrice: 65,
      description: "For enterprises and agencies",
      features: [
        "Everything in Pro plan",
        "Team collaboration tools",
        "REST API access",
        "Custom branding options",
        "White-label capabilities",
        "Dedicated account manager",
        "SLA guarantee",
        "Advanced security features",
        "Custom integrations",
        "Bulk workflow operations"
      ],
      limitations: []
    }
  ]

  const faqs = [
    {
      question: "How does the free plan work?",
      answer: "The free plan allows you to create up to 5 workflows per month with access to basic templates and features. No credit card required to get started."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated."
    },
    {
      question: "What's included in the API access?",
      answer: "Business plan includes full REST API access to create, manage, and deploy workflows programmatically with comprehensive documentation."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes, we offer custom enterprise solutions with dedicated support, custom integrations, and flexible pricing. Contact our sales team for details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial."
    }
  ]

  const handlePlanSelect = (plan) => {
    if (plan.price === 0) {
      toast.success("Welcome to AutoN8N Free! Sign up to get started.")
    } else {
      toast.info(`Starting ${plan.name} plan trial. Redirecting to checkout...`)
    }
  }

  const getPrice = (plan) => {
    return billingCycle === "yearly" ? plan.yearlyPrice : plan.price
  }

  const getSavings = (plan) => {
    if (plan.price === 0) return 0
    return Math.round(((plan.price * 12 - plan.yearlyPrice * 12) / (plan.price * 12)) * 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your automation needs. Start free, upgrade when you're ready to scale.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>
              Monthly
            </span>
            <button
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge variant="success" className="ml-2">
                Save up to 20%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {pricingPlans.map((plan, index) => (
            <div key={plan.name} className="relative">
              {billingCycle === "yearly" && plan.price > 0 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge variant="success">
                    Save ${(plan.price - plan.yearlyPrice) * 12}/year
                  </Badge>
                </div>
              )}
              <PricingCard
                plan={{
                  ...plan,
                  price: getPrice(plan)
                }}
                onSelect={handlePlanSelect}
                popular={plan.popular}
              />
            </div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-slate-400">
              See exactly what's included in each plan
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {[
                    { feature: "Workflows per month", free: "5", pro: "Unlimited", business: "Unlimited" },
                    { feature: "Workflow templates", free: "Basic", pro: "All templates", business: "All templates" },
                    { feature: "AI generation", free: "Basic", pro: "Advanced", business: "Advanced" },
                    { feature: "JSON export", free: "✓", pro: "✓", business: "✓" },
                    { feature: "Folder organization", free: "✗", pro: "✓", business: "✓" },
                    { feature: "Team collaboration", free: "✗", pro: "✓", business: "✓" },
                    { feature: "API access", free: "✗", pro: "✗", business: "✓" },
                    { feature: "Custom branding", free: "✗", pro: "✗", business: "✓" },
                    { feature: "White-label", free: "✗", pro: "✗", business: "✓" },
                    { feature: "Support", free: "Community", pro: "Priority", business: "Dedicated" }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-white font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-center text-slate-300">{row.free}</td>
                      <td className="px-6 py-4 text-sm text-center text-slate-300">{row.pro}</td>
                      <td className="px-6 py-4 text-sm text-center text-slate-300">{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-400">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Something Custom?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                We offer enterprise solutions with custom integrations, dedicated support, and flexible pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  <ApperIcon name="MessageCircle" size={24} className="mr-2" />
                  Contact Sales
                </Button>
                <Button variant="outline" size="lg">
                  <ApperIcon name="Calendar" size={24} className="mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Pricing