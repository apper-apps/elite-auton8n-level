import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Tech Startup",
    timezone: "UTC-8"
  })

  // Mock user data
  const user = {
    tier: "pro",
    workflowCount: 47,
    workflowLimit: "unlimited",
    joinDate: "2024-01-15",
    lastBilling: "2024-02-15",
    nextBilling: "2024-03-15"
  }

  const tabs = [
    { id: "profile", name: "Profile", icon: "User" },
    { id: "subscription", name: "Subscription", icon: "CreditCard" },
    { id: "billing", name: "Billing", icon: "Receipt" },
    { id: "api", name: "API Keys", icon: "Key" },
    { id: "team", name: "Team", icon: "Users" }
  ]

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully!")
  }

  const handleSubscriptionChange = () => {
    toast.info("Redirecting to billing portal...")
  }

  const handleGenerateApiKey = () => {
    if (user.tier === "free" || user.tier === "pro") {
      toast.error("API access is only available for Business plan subscribers")
      return
    }
    toast.success("New API key generated!")
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
          />
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          />
          <Input
            label="Company"
            value={profileData.company}
            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Timezone
            </label>
            <select 
              className="flex h-12 w-full rounded-xl border border-slate-600 bg-surface/50 px-4 py-3 text-base text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={profileData.timezone}
              onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
        </div>
        <div className="mt-8">
          <Button variant="primary" onClick={handleProfileUpdate}>
            <ApperIcon name="Save" size={20} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Subscription Details</h2>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Plan</h3>
            <p className="text-slate-400">You're on the {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} plan</p>
          </div>
          <Badge variant="primary" className="text-lg px-4 py-2">
            {user.tier.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{user.workflowCount}</p>
            <p className="text-slate-400">Workflows Created</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{user.workflowLimit}</p>
            <p className="text-slate-400">Monthly Limit</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">Feb 15</p>
            <p className="text-slate-400">Next Billing</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="primary" onClick={handleSubscriptionChange}>
            <ApperIcon name="CreditCard" size={20} className="mr-2" />
            Manage Subscription
          </Button>
          <Button variant="outline">
            <ApperIcon name="Download" size={20} className="mr-2" />
            Download Invoice
          </Button>
        </div>
      </Card>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Billing History</h2>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { date: "Feb 15, 2024", description: "Pro Plan - Monthly", amount: "$29.00", status: "Paid" },
                { date: "Jan 15, 2024", description: "Pro Plan - Monthly", amount: "$29.00", status: "Paid" },
                { date: "Dec 15, 2023", description: "Pro Plan - Monthly", amount: "$29.00", status: "Paid" }
              ].map((invoice, index) => (
                <tr key={index} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 text-sm text-white">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{invoice.description}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">{invoice.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Download" size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const renderApiTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">API Keys</h2>
      
      {user.tier === "business" ? (
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Manage API Access</h3>
            <p className="text-slate-400">
              Use these API keys to integrate AutoN8N with your applications
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-slate-600">
              <div>
                <p className="text-white font-medium">Production API Key</p>
                <p className="text-slate-400 text-sm">Created on Jan 15, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <code className="text-sm text-primary bg-primary/10 px-3 py-1 rounded">
                  an8n_prod_••••••••••••5a2f
                </code>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Copy" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="RotateCcw" size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary" onClick={handleGenerateApiKey}>
              <ApperIcon name="Plus" size={20} className="mr-2" />
              Generate New Key
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center">
          <ApperIcon name="Lock" size={48} className="text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">API Access Unavailable</h3>
          <p className="text-slate-400 mb-6">
            API access is only available for Business plan subscribers
          </p>
          <Button variant="primary" onClick={() => window.location.href = "/pricing"}>
            <ApperIcon name="Zap" size={20} className="mr-2" />
            Upgrade to Business
          </Button>
        </Card>
      )}
    </div>
  )

  const renderTeamTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Team Management</h2>
      
      {user.tier === "business" ? (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                <p className="text-slate-400">Manage your team's access to AutoN8N</p>
              </div>
              <Button variant="primary">
                <ApperIcon name="UserPlus" size={20} className="mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john.doe@example.com", role: "Owner", status: "Active" },
                { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active" },
                { name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer", status: "Pending" }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-slate-400 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={member.status === "Active" ? "success" : "warning"}>
                      {member.status}
                    </Badge>
                    <span className="text-sm text-slate-400">{member.role}</span>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <ApperIcon name="Users" size={48} className="text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Team Features Unavailable</h3>
          <p className="text-slate-400 mb-6">
            Team collaboration is available for Business plan subscribers
          </p>
          <Button variant="primary" onClick={() => window.location.href = "/pricing"}>
            <ApperIcon name="Zap" size={20} className="mr-2" />
            Upgrade to Business
          </Button>
        </Card>
      )}
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab()
      case "subscription": return renderSubscriptionTab()
      case "billing": return renderBillingTab()
      case "api": return renderApiTab()
      case "team": return renderTeamTab()
      default: return renderProfileTab()
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-slate-400">Manage your account preferences and subscription</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <ApperIcon name={tab.icon} size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Plan</span>
                    <Badge variant="primary">{user.tier.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Workflows</span>
                    <span className="text-sm text-white">{user.workflowCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Member Since</span>
                    <span className="text-sm text-white">Jan 2024</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 min-h-[600px]">
              {renderTabContent()}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Account