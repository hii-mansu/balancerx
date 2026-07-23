const healthStatus = new Map();

export function setHealth(target, healthy) {
  healthStatus.set(target, healthy);
}

export function isHealthy(target) {
  return healthStatus.get(target) ?? false;
}

export function getHealthyTargets(targets) {
  return targets.filter(isHealthy);
}