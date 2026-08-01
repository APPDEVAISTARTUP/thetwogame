import { defineTool } from "@lovable.dev/mcp-js";

const ROADMAP = [
  { phase: "Phase 01", title: "Prototype" },
  { phase: "Phase 02", title: "Vertical Slice" },
  { phase: "Phase 03", title: "Closed Demo" },
  { phase: "Phase 04", title: "Steam Page" },
  { phase: "Phase 05", title: "Wishlist Campaign" },
  { phase: "Phase 06", title: "Release" },
];

export default defineTool({
  name: "get_roadmap",
  title: "Get development roadmap",
  description: "Get the public development roadmap phases for TWO, in order.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(ROADMAP, null, 2) }],
    structuredContent: { phases: ROADMAP },
  }),
});