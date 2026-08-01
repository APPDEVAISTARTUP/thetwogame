import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_supporters",
  title: "List public supporters",
  description:
    "List the most recent public supporters shown on the TWO supporters wall (display name, amount, message).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("How many supporters to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const { data, error } = await supabaseAnon()
      .from("supporters")
      .select("display_name, amount_inr, message, created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);

    if (error) throw new ToolError(error.message);

    const supporters = data ?? [];
    return {
      content: [{ type: "text" as const, text: JSON.stringify(supporters, null, 2) }],
      structuredContent: { supporters },
    };
  },
});