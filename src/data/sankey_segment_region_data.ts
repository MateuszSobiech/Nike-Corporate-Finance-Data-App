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
      color: "#dddddd",
    },
    {
      source: "Footwear",
      target: "Europe, Middle East & Africa",
      value: 8473,
      color: "#dddddd",
    },
    {
      source: "Footwear",
      target: "Greater China",
      value: 5552,
      color: "#dddddd",
    },
    {
      source: "Footwear",
      target: "Asia Pacific & Latin America",
      value: 4865,
      color: "#dddddd",
    },
    {
      source: "Apparel",
      target: "North America",
      value: 5953,
      color: "#dddddd",
    },
    {
      source: "Apparel",
      target: "Europe, Middle East & Africa",
      value: 4380,
      color: "#dddddd",
    },
    {
      source: "Apparel",
      target: "Greater China",
      value: 1828,
      color: "#dddddd",
    },
    {
      source: "Apparel",
      target: "Asia Pacific & Latin America",
      value: 1614,
      color: "#dddddd",
    },
    {
      source: "Equipment",
      target: "North America",
      value: 906,
      color: "#dddddd",
    },
    {
      source: "Equipment",
      target: "Europe, Middle East & Africa",
      value: 754,
      color: "#dddddd",
    },
    {
      source: "Equipment",
      target: "Greater China",
      value: 165,
      color: "#dddddd",
    },
    {
      source: "Equipment",
      target: "Asia Pacific & Latin America",
      value: 250,
      color: "#dddddd",
    },
    {
      source: "North America",
      target: "NIKE Brand",
      value: 21396,
      color: "#dddddd",
    },
    {
      source: "Europe, Middle East & Africa",
      target: "NIKE Brand",
      value: 13607,
      color: "#dddddd",
    },
    {
      source: "Greater China",
      target: "NIKE Brand",
      value: 7545,
      color: "#dddddd",
    },
    {
      source: "Asia Pacific & Latin America",
      target: "NIKE Brand",
      value: 6729,
      color: "#dddddd",
    },
    {
      source: "Global Brand Divisions",
      target: "NIKE Brand",
      value: 45,
      color: "#dddddd",
    },
    {
      source: "NIKE Brand",
      target: "Revenues",
      value: 49322,
      color: "#dddddd",
    },
    { source: "Converse", target: "Revenues", value: 2082, color: "#dddddd" },
    { source: "Corporate", target: "Revenues", value: -42, color: "#dddddd" },
    {
      source: "Revenues",
      target: "Cost of sales",
      value: 28475,
      color: "#dddddd",
    },
    {
      source: "Revenues",
      target: "Gross profit",
      value: 22887,
      color: "#dddddd",
    },
    {
      source: "Gross profit",
      target: "Selling and administrative expense",
      value: 16576,
      color: "#dddddd",
    },
    {
      source: "Gross profit",
      target: "Interest expense",
      value: -161,
      color: "#dddddd",
    },
    {
      source: "Gross profit",
      target: "Income before taxes",
      value: 6472,
      color: "#dddddd",
    },
    {
      source: "Other income",
      target: "Income before taxes",
      value: -228,
      color: "#dddddd",
    },
    {
      source: "Selling and administrative expense",
      target: "Demand creation expense",
      value: 4285,
      color: "#dddddd",
    },
    {
      source: "Selling and administrative expense",
      target: "Operating overhead expense",
      value: 12291,
      color: "#dddddd",
    },
    {
      source: "Income before taxes",
      target: "Tax expense",
      value: 1000,
      color: "#dddddd",
    },
    {
      source: "Income before taxes",
      target: "Net income",
      value: 5700,
      color: "#dddddd",
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
