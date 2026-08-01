import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { UPI_ID, UPI_PAYEE_NAME, buildUpiLink, formatInr } from "@/config/support";

export default defineTool({
  name: "get_support_info",
  title: "Get support / donation info",
  description:
    "Get public crowdfunding details for TWO, including the UPI ID and a UPI deep link for an optional donation amount in INR.",
  inputSchema: {
    amountInr: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Optional donation amount in Indian Rupees."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ amountInr }) => {
    const payload = {
      upiId: UPI_ID,
      payeeName: UPI_PAYEE_NAME,
      suggestedAmountsInr: [100, 500, 1000],
      amountInr: amountInr ?? null,
      amountFormatted: amountInr ? formatInr(amountInr) : null,
      upiLink: buildUpiLink(amountInr),
      supportPage: "/support",
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});