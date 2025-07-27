import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const JsonViewer = ({ data, title = "JSON Output" }) => {
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const jsonString = JSON.stringify(data, null, 2)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      toast.success("JSON copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy JSON")
    }
  }

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "workflow.json"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("JSON file downloaded!")
  }

  const formatJson = (obj, indent = 0) => {
    if (obj === null) return <span className="json-null">null</span>
    if (typeof obj === "boolean") return <span className="json-boolean">{obj.toString()}</span>
    if (typeof obj === "number") return <span className="json-number">{obj}</span>
    if (typeof obj === "string") return <span className="json-string">"{obj}"</span>

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]"
      return (
        <div>
          <span>[</span>
          {obj.map((item, index) => (
            <div key={index} style={{ marginLeft: `${(indent + 1) * 20}px` }}>
              {formatJson(item, indent + 1)}
              {index < obj.length - 1 && ","}
            </div>
          ))}
          <div style={{ marginLeft: `${indent * 20}px` }}>]</div>
        </div>
      )
    }

    if (typeof obj === "object") {
      const keys = Object.keys(obj)
      if (keys.length === 0) return "{}"
      return (
        <div>
          <span>{"{"}</span>
          {keys.map((key, index) => (
            <div key={key} style={{ marginLeft: `${(indent + 1) * 20}px` }}>
              <span className="json-key">"{key}"</span>: {formatJson(obj[key], indent + 1)}
              {index < keys.length - 1 && ","}
            </div>
          ))}
          <div style={{ marginLeft: `${indent * 20}px` }}>{"}"}</div>
        </div>
      )
    }

    return String(obj)
  }

  if (fullscreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <ApperIcon name={copied ? "Check" : "Copy"} size={16} className="mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="ghost" size="sm" onClick={downloadJson}>
                <ApperIcon name="Download" size={16} className="mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setFullscreen(false)}>
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <pre className="json-viewer text-sm">{formatJson(data)}</pre>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={copyToClipboard}>
            <ApperIcon name={copied ? "Check" : "Copy"} size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={downloadJson}>
            <ApperIcon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setFullscreen(true)}>
            <ApperIcon name="Maximize2" size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {data ? (
          <pre className="json-viewer text-sm">{formatJson(data)}</pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <ApperIcon name="Code" size={48} className="mb-4" />
            <p>Generate a workflow to see the JSON output</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default JsonViewer