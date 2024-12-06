// @ts-nocheck

const sankey_segment_region_data = {
  nodes: [
    { name: "Footwear" },
    { name: "North America" },
    { name: "Europe, Middle East & Africa" },
    { name: "Greater China" },
    { name: "Asia Pacific & Latin America" },
    { name: "Apparel" },
    { name: "Equipment" },
    { name: "NIKE Brand" },
    { name: "Global Brand Divisions" },
    { name: "Revenues" },
    { name: "Converse" },
    { name: "Corporate" },
    { name: "Cost of sales" },
    { name: "Gross profit" },
    { name: "Selling and administrative expense" },
    { name: "Interest expense" },
    { name: "Income before taxes" },
    { name: "Other income" },
    { name: "Demand creation expense" },
    { name: "Operating overhead expense" },
    { name: "Tax expense" },
    { name: "Net income" },
  ],
  links: [
    {
      source: "Footwear",
      target: "North America",
      value: 14537,
      color: "#d4d4d4",
    },
    {
      source: "Footwear",
      target: "Europe, Middle East & Africa",
      value: 8473,
      color: "#d4d4d4",
    },
    {
      source: "Footwear",
      target: "Greater China",
      value: 5552,
      color: "#d4d4d4",
    },
    {
      source: "Footwear",
      target: "Asia Pacific & Latin America",
      value: 4865,
      color: "#d4d4d4",
    },
    {
      source: "Apparel",
      target: "North America",
      value: 5953,
      color: "#d4d4d4",
    },
    {
      source: "Apparel",
      target: "Europe, Middle East & Africa",
      value: 4380,
      color: "#d4d4d4",
    },
    {
      source: "Apparel",
      target: "Greater China",
      value: 1828,
      color: "#d4d4d4",
    },
    {
      source: "Apparel",
      target: "Asia Pacific & Latin America",
      value: 1614,
      color: "#d4d4d4",
    },
    {
      source: "Equipment",
      target: "North America",
      value: 906,
      color: "#d4d4d4",
    },
    {
      source: "Equipment",
      target: "Europe, Middle East & Africa",
      value: 754,
      color: "#d4d4d4",
    },
    {
      source: "Equipment",
      target: "Greater China",
      value: 165,
      color: "#d4d4d4",
    },
    {
      source: "Equipment",
      target: "Asia Pacific & Latin America",
      value: 250,
      color: "#d4d4d4",
    },
    {
      source: "North America",
      target: "NIKE Brand",
      value: 21396,
      color: "#d4d4d4",
    },
    {
      source: "Europe, Middle East & Africa",
      target: "NIKE Brand",
      value: 13607,
      color: "#d4d4d4",
    },
    {
      source: "Greater China",
      target: "NIKE Brand",
      value: 7545,
      color: "#d4d4d4",
    },
    {
      source: "Asia Pacific & Latin America",
      target: "NIKE Brand",
      value: 6729,
      color: "#d4d4d4",
    },
    {
      source: "Global Brand Divisions",
      target: "NIKE Brand",
      value: 45,
      color: "#d4d4d4",
    },
    {
      source: "NIKE Brand",
      target: "Revenues",
      value: 49322,
      color: "#d4d4d4",
    },
    { source: "Converse", target: "Revenues", value: 2082, color: "#d4d4d4" },
    { source: "Corporate", target: "Revenues", value: -42, color: "#d4d4d4" },
    {
      source: "Revenues",
      target: "Cost of sales",
      value: 28475,
      color: "#ef4444",
    },
    {
      source: "Revenues",
      target: "Gross profit",
      value: 22887,
      color: "#16a34a",
    },
    {
      source: "Gross profit",
      target: "Selling and administrative expense",
      value: 16576,
      color: "#ef4444",
    },
    {
      source: "Gross profit",
      target: "Interest expense",
      value: -161,
      color: "#ef4444",
    },
    {
      source: "Gross profit",
      target: "Income before taxes",
      value: 6472,
      color: "#16a34a",
    },
    {
      source: "Other income",
      target: "Income before taxes",
      value: -228,
      color: "#16a34a",
    },
    {
      source: "Selling and administrative expense",
      target: "Demand creation expense",
      value: 4285,
      color: "#ef4444",
    },
    {
      source: "Selling and administrative expense",
      target: "Operating overhead expense",
      value: 12291,
      color: "#ef4444",
    },
    {
      source: "Income before taxes",
      target: "Tax expense",
      value: 1000,
      color: "#ef4444",
    },
    {
      source: "Income before taxes",
      target: "Net income",
      value: 5700,
      color: "#16a34a",
    },
  ],
}

const validateNodes = (data) => {
  const expectedNodes = new Set(
    data.links.flatMap(({ source, target }) => [source, target]),
  )

  const existingNodes = new Set(data.nodes.map((node) => node.name))
  const missingNodes = [...expectedNodes].filter(
    (node) => !existingNodes.has(node),
  )

  if (missingNodes.length > 0) {
    console.warn("Adding missing nodes:", missingNodes)
    data.nodes.push(...missingNodes.map((name) => ({ name })))
  }
}

const calculateNodeValues = (data) => {
  const nodeValues = {}
  data.links.forEach(({ source, target, value }) => {
    nodeValues[source] = (nodeValues[source] || 0) + value
    nodeValues[target] = (nodeValues[target] || 0) + value
  })

  data.nodes.forEach((node) => {
    node.value = nodeValues[node.name] || 0
  })
}

const updateSankeyData = (data) => {
  validateNodes(data)
  calculateNodeValues(data)
  return data
}

const sankeySegmentRegionData = updateSankeyData(sankey_segment_region_data)

export default sankeySegmentRegionData
