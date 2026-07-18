import { config } from "../config/config.js";
import { roundRobin } from "../algorithms/roundRobin.js";
import { getHealthyTargets } from "../health/healthStore.js";

export function selectTarget() {
  const healthyTargets = getHealthyTargets(config.targets);

  if (healthyTargets.length === 0) {
    return null;
  }

  switch (config.algorithm) {
    case "round-robin":
      return roundRobin(healthyTargets);

    default:
      throw new Error(`Unknown algorithm: ${config.algorithm}`);
  }
}