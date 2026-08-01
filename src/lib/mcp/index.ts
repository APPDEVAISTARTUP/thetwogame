import { defineMcp } from "@lovable.dev/mcp-js";
import getGameInfo from "./tools/get-game-info";
import getRoadmap from "./tools/get-roadmap";
import getSupportInfo from "./tools/get-support-info";
import listSupporters from "./tools/list-supporters";

export default defineMcp({
  name: "twoofficial",
  title: "TWOOFFICIAL",
  version: "0.1.0",
  instructions:
    "Public tools for TWO, a third-person open-world zombie survival game built in Unreal Engine 5 by a solo developer. Use `get_game_info` for an overview, `get_roadmap` for development phases, `get_support_info` for crowdfunding/UPI details, and `list_supporters` for the public supporters wall.",
  tools: [getGameInfo, getRoadmap, getSupportInfo, listSupporters],
});