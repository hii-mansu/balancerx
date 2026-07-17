import { config } from "../config/config.js";
import { roundRobin } from "../algorithms/roundRobin.js";

export function selectTarget() {
  switch (config.algorithm) {
    case "round-robin":
      return roundRobin(config.targets);

    default:
      throw new Error(`Unknown algorithm: ${config.algorithm}`);
  }
}