let current = 0;

export function roundRobin(targets) {
  const target = targets[current];

  current = (current + 1) % targets.length;

  return target;
}