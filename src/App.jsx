import { Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import Error from "@/components/ui/Error";
import WorkflowGenerator from "@/components/pages/WorkflowGenerator";
import WorkflowLibrary from "@/components/pages/WorkflowLibrary";
import Account from "@/components/pages/Account";
import Templates from "@/components/pages/Templates";
import Dashboard from "@/components/pages/Dashboard";
import LandingPage from "@/components/pages/LandingPage";
import Pricing from "@/components/pages/Pricing";

// Error Boundary for MetaMask and Web3 connection issues
class Web3ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Check if error is related to MetaMask or Web3
    const isWeb3Error = error?.message?.toLowerCase().includes('metamask') ||
                       error?.message?.toLowerCase().includes('web3') ||
                       error?.message?.toLowerCase().includes('wallet') ||
                       error?.code === 4001 || // User rejected
                       error?.code === -32002   // Request pending
    
    return { hasError: true, error: isWeb3Error ? error : null }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Web3/MetaMask Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-error/10 mb-4">
                <svg className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Wallet Connection Error</h3>
              <p className="text-gray-300 mb-4">
                {this.state.error.message.includes('MetaMask') 
                  ? 'Failed to connect to MetaMask. Please make sure MetaMask is installed and unlocked.'
                  : 'Wallet connection failed. Please try again.'}
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  return (
    <Web3ErrorBoundary>
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
    </Web3ErrorBoundary>
  )
}

export default App