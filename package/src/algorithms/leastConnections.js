import { getConnections } from "../connections/connectionStore.js";

export function leastConnections(targets) {
  let selectedTarget = targets[0];

  for (const target of targets) {
    if (getConnections(target) < getConnections(selectedTarget)) {
      selectedTarget = target;
    }
  }

  return selectedTarget;
}