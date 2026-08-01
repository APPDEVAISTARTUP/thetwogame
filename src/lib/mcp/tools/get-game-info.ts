import { defineTool } from "@lovable.dev/mcp-js";

const GAME = {
  title: "TWO",
  genre: "Third-person open-world zombie survival",
  engine: "Unreal Engine 5",
  platform: "PC",
  developer: "Shade Studios — solo developer from India",
  setting:
    "Set during the outbreak itself: you witness civilization collapse in real time across a cinematic, atmospheric open world.",
  pillars: [
    "Atmosphere and tension over action spectacle",
    "Realistic, hand-crafted environments",
    "Exploration, scavenging and survival pressure",
    "Cinematic presentation and sound design",
  ],
  status: "In active development. No release date announced yet.",
  links: {
    instagram: "https://www.instagram.com/shadestudiosofficial/",
    contactEmail: "progamedev@gmail.com",
  },
};

export default defineTool({
  name: "get_game_info",
  title: "Get game info",
  description:
    "Get public overview information about the game TWO: genre, engine, platform, developer, setting, design pillars and official links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(GAME, null, 2) }],
    structuredContent: GAME,
  }),
});