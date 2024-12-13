// @ts-nocheck

const sankey_segment_data = {
  nodes: [
    { name: "Footwear" },
    { name: "Apparel" },
    { name: "Equipment" },
    { name: "Global Brand Divisions" },
    { name: "NIKE Brand" },
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
      target: "NIKE Brand",
      value: 33427,
      color: "#d1d5db",
    },
    { source: "Apparel", target: "NIKE Brand", value: 13775, color: "#d1d5db" },
    {
      source: "Equipment",
      target: "NIKE Brand",
      value: 2075,
      color: "#d1d5db",
    },
    {
      source: "Global Brand Divisions",
      target: "NIKE Brand",
      value: 45,
      color: "#d1d5db",
    },
    {
      source: "NIKE Brand",
      target: "Revenues",
      value: 49322,
      color: "#d1d5db",
    },
    { source: "Converse", target: "Revenues", value: 2082, color: "#d1d5db" },
    { source: "Corporate", target: "Revenues", value: -42, color: "#d1d5db" },
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
      color: "#059669",
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
      color: "#059669",
    },
    {
      source: "Other income",
      target: "Income before taxes",
      value: -228,
      color: "#059669",
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
      color: "#059669",
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

const sankeySegmentData = updateSankeyData(sankey_segment_data)

export default sankeySegmentData
