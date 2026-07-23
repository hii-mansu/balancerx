const connections = new Map();

export function incrementConnections(target) {
  const count = connections.get(target) ?? 0;
  connections.set(target, count + 1);
}

export function decrementConnections(target) {
  const count = connections.get(target) ?? 0;

  connections.set(target, Math.max(0, count - 1));
}

export function getConnections(target) {
  return connections.get(target) ?? 0;
}