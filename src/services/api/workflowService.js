import workflowsData from "@/services/mockData/workflows.json"

let workflows = [...workflowsData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const workflowService = {
  async getAll() {
    await delay()
    return [...workflows]
  },

  async getById(id) {
    await delay()
    const workflow = workflows.find(w => w.Id === parseInt(id))
    if (!workflow) {
      throw new Error("Workflow not found")
    }
    return { ...workflow }
  },

  async create(workflowData) {
    await delay()
    const newId = Math.max(...workflows.map(w => w.Id), 0) + 1
    const newWorkflow = {
      Id: newId,
      ...workflowData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    workflows.push(newWorkflow)
    return { ...newWorkflow }
  },

  async update(id, updates) {
    await delay()
    const index = workflows.findIndex(w => w.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Workflow not found")
    }
    workflows[index] = {
      ...workflows[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...workflows[index] }
  },

  async delete(id) {
    await delay()
    const index = workflows.findIndex(w => w.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Workflow not found")
    }
    workflows.splice(index, 1)
    return true
  }
}