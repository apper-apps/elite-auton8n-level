import templatesData from "@/services/mockData/templates.json"

let templates = [...templatesData]

const delay = () => new Promise(resolve => setTimeout(resolve, 250))

export const templateService = {
  async getAll() {
    await delay()
    return [...templates]
  },

  async getById(id) {
    await delay()
    const template = templates.find(t => t.Id === parseInt(id))
    if (!template) {
      throw new Error("Template not found")
    }
    return { ...template }
  },

  async getByCategory(category) {
    await delay()
    return templates.filter(t => t.category === category)
  }
}