import { config } from "../config/config.js";
import { roundRobin } from "../algorithms/roundRobin.js";
import { leastConnections } from "../algorithms/leastConnections.js";

export function selectTarget(targets) {
  if (targets.length === 0) {
    return null;
  }

  switch (config.algorithm) {
    case "round-robin":
      return roundRobin(targets);

    case "least-connections":
      return leastConnections(targets);

    default:
      throw new Error(`Unknown algorithm: ${config.algorithm}`);
  }
}