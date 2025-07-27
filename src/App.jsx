import { Routes, Route } from "react-router-dom"
import Layout from "@/components/organisms/Layout"
import LandingPage from "@/components/pages/LandingPage"
import Dashboard from "@/components/pages/Dashboard"
import WorkflowGenerator from "@/components/pages/WorkflowGenerator"
import WorkflowLibrary from "@/components/pages/WorkflowLibrary"
import Templates from "@/components/pages/Templates"
import Pricing from "@/components/pages/Pricing"
import Account from "@/components/pages/Account"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="generator" element={<WorkflowGenerator />} />
        <Route path="workflows" element={<WorkflowLibrary />} />
        <Route path="templates" element={<Templates />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  )
}

export default App