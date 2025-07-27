import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const PricingCard = ({ plan, onSelect, popular = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Badge variant="accent">
            <ApperIcon name="Star" size={12} className="mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`p-8 h-full flex flex-col ${popular ? "border-accent shadow-accent/20" : ""}`}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">${plan.price}</span>
            {plan.price > 0 && <span className="text-slate-400">/month</span>}
          </div>
          <p className="text-slate-400">{plan.description}</p>
        </div>

        <div className="flex-1 mb-8">
          <ul className="space-y-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <ApperIcon 
                  name="Check" 
                  size={20} 
                  className="text-success mr-3 mt-0.5 flex-shrink-0" 
                />
                <span className="text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant={popular ? "accent" : "primary"}
          size="lg"
          onClick={() => onSelect(plan)}
          className="w-full"
        >
          {plan.price === 0 ? "Get Started Free" : "Start Free Trial"}
        </Button>
      </Card>
    </motion.div>
  )
}

export default PricingCard